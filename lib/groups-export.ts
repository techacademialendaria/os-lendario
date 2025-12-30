/**
 * WhatsApp Groups Export Utilities
 * Supports Excel, CSV, JSON, and PDF export
 */

import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import type { GroupRecord } from '../types/groups';

export interface ExportOptions {
  grupo: string;
  dataSelecionada?: string | null;
  dateRange?: { from: Date | undefined; to: Date | undefined };
}

/**
 * Formata os dados para exportação
 */
function formatDataForExport(registros: GroupRecord[]) {
  return registros.map(r => ({
    Data: r.data_resumo,
    Grupo: r.grupo,
    Sentimento: r.Sentimento,
    Participantes: r.participantes_do_dia || r.Participantes || '',
    'Qtd Participantes': (r.participantes_do_dia || r.Participantes || '')
      .split(',')
      .filter((p: string) => p.trim()).length,
    Resumo: r.Resumo || '',
    Insights: r['Insights futuros'] || '',
    'Reclamações/Queixas': r['reclamacao/queixas'] || ''
  }));
}

/**
 * Gera nome do arquivo baseado nos filtros
 */
function generateFileName(options: ExportOptions, extension: string): string {
  const { grupo, dataSelecionada, dateRange } = options;
  const sanitizedGrupo = grupo.replace(/[^a-zA-Z0-9]/g, '_');

  if (dataSelecionada) {
    return `${sanitizedGrupo}_${dataSelecionada}.${extension}`;
  }

  if (dateRange?.from) {
    const fromStr = format(dateRange.from, 'yyyy-MM-dd');
    const toStr = dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : 'ate-hoje';
    return `${sanitizedGrupo}_${fromStr}_${toStr}.${extension}`;
  }

  return `${sanitizedGrupo}_ultimos_registros.${extension}`;
}

/**
 * Exporta para Excel (XLSX)
 */
export function exportToExcel(registros: GroupRecord[], options: ExportOptions): void {
  if (registros.length === 0) return;

  const dados = formatDataForExport(registros);
  const ws = XLSX.utils.json_to_sheet(dados);

  ws['!cols'] = [
    { wch: 12 }, { wch: 20 }, { wch: 12 }, { wch: 40 },
    { wch: 15 }, { wch: 50 }, { wch: 50 }, { wch: 50 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dados');
  XLSX.writeFile(wb, generateFileName(options, 'xlsx'));
}

/**
 * Exporta para CSV
 */
export function exportToCSV(registros: GroupRecord[], options: ExportOptions): void {
  if (registros.length === 0) return;

  const dados = formatDataForExport(registros);
  const headers = Object.keys(dados[0]);

  const csvContent = [
    headers.join(','),
    ...dados.map(row =>
      headers.map(header => {
        const value = String(row[header as keyof typeof row] || '');
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, generateFileName(options, 'csv'));
}

/**
 * Exporta para JSON
 */
export function exportToJSON(registros: GroupRecord[], options: ExportOptions): void {
  if (registros.length === 0) return;

  const dados = formatDataForExport(registros);
  const jsonContent = JSON.stringify({
    exportDate: new Date().toISOString(),
    grupo: options.grupo,
    totalRegistros: dados.length,
    registros: dados
  }, null, 2);

  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  downloadBlob(blob, generateFileName(options, 'json'));
}

/**
 * Exporta para PDF (versão simplificada usando tabela HTML)
 */
export function exportToPDF(registros: GroupRecord[], options: ExportOptions): void {
  if (registros.length === 0) return;

  const dados = formatDataForExport(registros);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Relatório - ${options.grupo}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #C9B298; border-bottom: 2px solid #C9B298; padding-bottom: 10px; }
        h2 { color: #666; margin-top: 5px; font-weight: normal; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
        th { background: #C9B298; color: white; padding: 10px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #ddd; vertical-align: top; }
        tr:nth-child(even) { background: #f9f9f9; }
        .sentiment-positivo { color: #22c55e; font-weight: bold; }
        .sentiment-negativo { color: #ef4444; font-weight: bold; }
        .sentiment-neutro, .sentiment-misto { color: #f59e0b; font-weight: bold; }
        .summary { max-width: 300px; }
        .footer { margin-top: 30px; text-align: center; color: #999; font-size: 10px; }
        @media print {
          body { padding: 0; }
          @page { margin: 1cm; }
        }
      </style>
    </head>
    <body>
      <h1>Relatório de Grupos</h1>
      <h2>${options.grupo} | Exportado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm")}</h2>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Sentimento</th>
            <th>Participantes</th>
            <th>Resumo</th>
            <th>Reclamações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(row => `
            <tr>
              <td>${row.Data}</td>
              <td class="sentiment-${row.Sentimento?.toLowerCase()}">${row.Sentimento}</td>
              <td>${row['Qtd Participantes']}</td>
              <td class="summary">${truncate(row.Resumo, 200)}</td>
              <td class="summary">${truncate(row['Reclamações/Queixas'], 150)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        MMOS - Dashboard de Grupos WhatsApp | ${dados.length} registros
      </div>

      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}

/**
 * Helper para download de blob
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Helper para truncar texto
 */
function truncate(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
