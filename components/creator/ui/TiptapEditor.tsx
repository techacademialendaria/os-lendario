import React, { useState, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { marked } from 'marked';
import TurndownService from 'turndown';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

// Initialize turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

// Helper: Convert markdown to HTML
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  try {
    return marked.parse(markdown, { async: false }) as string;
  } catch {
    return markdown;
  }
};

// Helper: Convert HTML to markdown
const htmlToMarkdown = (html: string): string => {
  if (!html) return '';
  try {
    return turndownService.turndown(html);
  } catch {
    return html;
  }
};

export interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Comece a escrever...',
  minHeight = '450px',
}) => {
  const [mode, setMode] = useState<'visual' | 'markdown'>('visual');
  const [markdownContent, setMarkdownContent] = useState(content || '');

  const initialHtml = useMemo(() => markdownToHtml(content || ''), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      if (mode === 'visual') {
        const html = editor.getHTML();
        const md = htmlToMarkdown(html);
        setMarkdownContent(md);
        onChange(md);
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-invert max-w-none focus:outline-none p-6`,
        style: `min-height: ${minHeight}`,
      },
    },
  });

  const handleModeSwitch = (newMode: 'visual' | 'markdown') => {
    if (newMode === mode) return;

    if (newMode === 'markdown' && editor) {
      const html = editor.getHTML();
      const md = htmlToMarkdown(html);
      setMarkdownContent(md);
    } else if (newMode === 'visual' && editor) {
      const html = markdownToHtml(markdownContent);
      editor.commands.setContent(html);
    }

    setMode(newMode);
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const md = e.target.value;
    setMarkdownContent(md);
    onChange(md);
  };

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper overflow-hidden rounded-lg border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 p-2">
        {mode === 'visual' && (
          <>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('bold') && 'bg-accent text-primary'
              )}
              title="Negrito (Ctrl+B)"
            >
              <Icon name="bold" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('italic') && 'bg-accent text-primary'
              )}
              title="Itálico (Ctrl+I)"
            >
              <Icon name="italic" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('strike') && 'bg-accent text-primary'
              )}
              title="Tachado"
            >
              <Icon name="strikethrough" size="size-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={cn(
                'rounded p-2 text-sm font-bold transition-colors hover:bg-accent',
                editor.isActive('heading', { level: 2 }) && 'bg-accent text-primary'
              )}
              title="Título H2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={cn(
                'rounded p-2 text-sm font-bold transition-colors hover:bg-accent',
                editor.isActive('heading', { level: 3 }) && 'bg-accent text-primary'
              )}
              title="Título H3"
            >
              H3
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('bulletList') && 'bg-accent text-primary'
              )}
              title="Lista com marcadores"
            >
              <Icon name="list" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('orderedList') && 'bg-accent text-primary'
              )}
              title="Lista numerada"
            >
              <Icon name="list-ol" size="size-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('blockquote') && 'bg-accent text-primary'
              )}
              title="Citação"
            >
              <Icon name="quote-right" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('codeBlock') && 'bg-accent text-primary'
              )}
              title="Bloco de código"
            >
              <Icon name="code" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="rounded p-2 transition-colors hover:bg-accent"
              title="Linha horizontal"
            >
              <Icon name="minus" size="size-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="rounded p-2 transition-colors hover:bg-accent disabled:opacity-30"
              title="Desfazer (Ctrl+Z)"
            >
              <Icon name="undo" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="rounded p-2 transition-colors hover:bg-accent disabled:opacity-30"
              title="Refazer (Ctrl+Y)"
            >
              <Icon name="redo" size="size-4" />
            </button>
          </>
        )}

        {/* Mode Toggle */}
        <div className="flex-1" />
        <div className="flex items-center gap-1 rounded-md bg-muted p-1">
          <button
            onClick={() => handleModeSwitch('visual')}
            className={cn(
              'rounded px-3 py-1 text-sm transition-colors',
              mode === 'visual'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon name="eye" size="size-4" className="mr-1.5 inline" />
            Visual
          </button>
          <button
            onClick={() => handleModeSwitch('markdown')}
            className={cn(
              'rounded px-3 py-1 text-sm transition-colors',
              mode === 'markdown'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Markdown
          </button>
        </div>
      </div>

      {/* Editor Content */}
      {mode === 'visual' ? (
        <EditorContent editor={editor} className="tiptap-content" />
      ) : (
        <textarea
          value={markdownContent}
          onChange={handleMarkdownChange}
          className="w-full resize-none bg-transparent p-6 font-mono text-sm leading-relaxed text-foreground focus:outline-none"
          style={{ minHeight }}
          placeholder="Escreva em markdown..."
          spellCheck={false}
        />
      )}

      <style>{`
        .tiptap-content .ProseMirror {
          min-height: ${minHeight};
          padding: 24px;
          color: hsl(var(--foreground));
          font-size: 15px;
          line-height: 1.75;
        }
        .tiptap-content .ProseMirror:focus {
          outline: none;
        }
        .tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        .tiptap-content .ProseMirror h1,
        .tiptap-content .ProseMirror h2,
        .tiptap-content .ProseMirror h3 {
          color: hsl(var(--foreground));
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .tiptap-content .ProseMirror h1 { font-size: 1.875rem; }
        .tiptap-content .ProseMirror h2 { font-size: 1.5rem; }
        .tiptap-content .ProseMirror h3 { font-size: 1.25rem; }
        .tiptap-content .ProseMirror strong { font-weight: 600; }
        .tiptap-content .ProseMirror a { color: hsl(var(--primary)); text-decoration: underline; }
        .tiptap-content .ProseMirror blockquote {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1rem;
          margin-left: 0;
          color: hsl(var(--muted-foreground));
          font-style: italic;
        }
        .tiptap-content .ProseMirror ul,
        .tiptap-content .ProseMirror ol {
          padding-left: 1.5rem;
        }
        .tiptap-content .ProseMirror li { margin: 0.25em 0; }
        .tiptap-content .ProseMirror code {
          background-color: hsl(var(--muted));
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .tiptap-content .ProseMirror pre {
          background-color: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
        }
        .tiptap-content .ProseMirror pre code {
          background: none;
          padding: 0;
        }
        .tiptap-content .ProseMirror hr {
          border: none;
          border-top: 1px solid hsl(var(--border));
          margin: 2em 0;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
