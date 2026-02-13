"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';
import { useToast } from '@/shared/hooks/use-toast';
import { StudentNote } from '@/shared/types/student';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Save,
  X,
  StickyNote,
  Clock
} from 'lucide-react';

interface NotesPanelProps {
  notes: StudentNote[];
  lessonId: string;
  onAddNote: (content: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  lessonId,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [editContent, setEditContent] = useState('');
  const { toast } = useToast();

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
      setIsAdding(false);
      toast({
        title: "Nota adicionada!",
        description: "Sua nota foi salva com sucesso.",
      });
    }
  };

  const handleEditStart = (note: StudentNote) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleEditSave = () => {
    if (editingId && editContent.trim()) {
      onUpdateNote(editingId, editContent);
      setEditingId(null);
      setEditContent('');
      toast({
        title: "Nota atualizada!",
        description: "Suas alterações foram salvas.",
      });
    }
  };

  const handleDelete = (noteId: string) => {
    onDeleteNote(noteId);
    toast({
      title: "Nota excluída!",
      description: "A nota foi removida com sucesso.",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <StickyNote className="h-5 w-5" />
            <span>Minhas Notas</span>
            <Badge variant="outline">{notes.length}</Badge>
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAdding(true)}
            className="bg-blue-900 hover:bg-blue-800"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Nova Nota
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Note */}
        {isAdding && (
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <Textarea
              placeholder="Digite sua nota aqui..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleAddNote}>
                <Save className="h-4 w-4 mr-1" />
                Salvar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewNote('');
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-3">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <StickyNote className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhuma nota ainda</p>
              <p className="text-sm">Adicione notas para lembrar pontos importantes</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                {editingId === note.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleEditSave}>
                        <Save className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setEditContent('');
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimestamp(note.createdAt)}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditStart(note)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(note.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesPanel;

