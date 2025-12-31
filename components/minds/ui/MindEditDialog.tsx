// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Select } from '../../ui/select';
import { Icon } from '../../ui/icon';
import { MindProfile } from '../../../hooks/useMind';
import { supabase } from '../../../lib/supabase';

interface MindEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mind: MindProfile;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  signatureSkill: string;
  shortBio: string;
  status: 'production' | 'progress' | 'draft';
  tier: '1' | '2' | '3';
}

export const MindEditDialog: React.FC<MindEditDialogProps> = ({
  open,
  onOpenChange,
  mind,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();

  // Initialize form with mind data
  useEffect(() => {
    if (mind && open) {
      setValue('name', mind.name);
      setValue('signatureSkill', mind.signatureSkill || '');
      setValue('shortBio', mind.shortBio || '');
      setValue('status', mind.status || 'draft');
      setValue('tier', String(mind.tier) as '1' | '2' | '3');
    }
  }, [mind, open, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Prepare metadata overrides
      const overrides = {
        status: data.status,
        tier: data.tier,
        signature_skill: data.signatureSkill,
      };

      const { error } = await supabase
        .from('minds')
        .update({
          name: data.name,
          short_bio: data.shortBio,
          // Preserve existing metadata, merge overrides
          mmos_metadata: {
            ...(mind.mmos_metadata || {}),
            overrides,
          },
          // We can't update tier/status directly as they don't exist
        })
        .eq('id', mind.id);

      if (error) throw error;

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating mind:', error);
    } finally {
      setLoading(false);
    }
  };

  const status = watch('status');
  const tier = watch('tier');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-studio-bg text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="settings" className="text-studio-primary" />
            Configurações da Mente
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Ajuste os parâmetros fundamentais desta instância cognitiva.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Nome da Mente</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
                className="border-white/10 bg-zinc-900/50 focus:border-studio-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status do Sistema</Label>
              <Select
                value={status}
                onValueChange={(val) => setValue('status', val as any)}
                className="border-white/10 bg-zinc-900/50"
                options={[
                  { value: 'production', label: 'Operational (Prod)' },
                  { value: 'progress', label: 'Training (Dev)' },
                  { value: 'draft', label: 'Offline (Draft)' },
                ]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tier">Nível de Complexidade (Tier)</Label>
              <Select
                value={tier}
                onValueChange={(val) => setValue('tier', val as any)}
                className="border-white/10 bg-zinc-900/50"
                options={[
                  { value: '1', label: 'Tier 1 (Basic)' },
                  { value: '2', label: 'Tier 2 (Advanced)' },
                  { value: '3', label: 'Tier 3 (Expert)' },
                ]}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="signatureSkill">Signature Skill (Habilidade Principal)</Label>
              <Input
                id="signatureSkill"
                {...register('signatureSkill')}
                placeholder="Ex: Arquiteto de Sistemas Cognitivos"
                className="border-white/10 bg-zinc-900/50"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="shortBio">Bio Resumida</Label>
              <Textarea
                id="shortBio"
                {...register('shortBio')}
                className="min-h-[100px] border-white/10 bg-zinc-900/50"
                placeholder="Descrição breve da função e personalidade desta mente..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-studio-primary text-white hover:bg-studio-primary/90"
              disabled={loading}
            >
              {loading ? (
                <Icon name="refresh" className="mr-2 animate-spin" />
              ) : (
                <Icon name="save" className="mr-2" />
              )}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
