
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload } from 'lucide-react';
import { Course, CourseModule, Lesson } from '@/types/student';

interface CourseFormProps {
  course?: Course | null;
  onSave: (course: any) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    thumbnail: course?.thumbnail || '',
    instructor: course?.instructor || '',
    duration: course?.duration || '',
    level: course?.level || 'Iniciante',
    category: course?.category || '',
    price: course?.price || 0,
    currency: course?.currency || 'AOA',
    published: course?.published || false,
    tags: course?.tags?.join(', ') || '',
    prerequisites: course?.prerequisites?.join('\n') || '',
    learningObjectives: course?.learningObjectives?.join('\n') || '',
  });

  const [modules, setModules] = useState<CourseModule[]>(course?.modules || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      prerequisites: formData.prerequisites.split('\n').map(p => p.trim()).filter(Boolean),
      learningObjectives: formData.learningObjectives.split('\n').map(o => o.trim()).filter(Boolean),
      modules,
      rating: course?.rating || 0,
      reviewsCount: course?.reviewsCount || 0,
      createdAt: course?.createdAt || new Date().toISOString().split('T')[0],
    };

    onSave(course ? { ...course, ...courseData } : courseData);
  };

  const addModule = () => {
    const newModule: CourseModule = {
      id: `m${Date.now()}`,
      title: '',
      description: '',
      order: modules.length + 1,
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (index: number, field: string, value: string) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setModules(updatedModules);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const addLesson = (moduleIndex: number) => {
    const newLesson: Lesson = {
      id: `l${Date.now()}`,
      title: '',
      description: '',
      videoUrl: '',
      videoType: 'youtube',
      duration: '',
      order: modules[moduleIndex].lessons.length + 1
    };

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push(newLesson);
    setModules(updatedModules);
  };

  const updateLesson = (moduleIndex: number, lessonIndex: number, field: string, value: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      [field]: value
    };
    setModules(updatedModules);
  };

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
    setModules(updatedModules);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título do Curso</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Instrutor</label>
              <Input
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duração</label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="8 horas"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nível</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                className="w-full p-2 border rounded-md"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Vendas"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Preço (AOA)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL da Imagem</label>
            <div className="flex gap-2">
              <Input
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://..."
              />
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="vendas, angola, estratégias"
              />
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="mr-2"
                />
                Publicar Curso
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pré-requisitos (um por linha)</label>
            <Textarea
              value={formData.prerequisites}
              onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
              rows={3}
              placeholder="Conhecimentos básicos de vendas&#10;Experiência em atendimento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Objetivos de Aprendizagem (um por linha)</label>
            <Textarea
              value={formData.learningObjectives}
              onChange={(e) => setFormData({ ...formData, learningObjectives: e.target.value })}
              rows={3}
              placeholder="Dominar técnicas avançadas de closing&#10;Identificar oportunidades de upselling"
            />
          </div>
        </CardContent>
      </Card>

      {/* Módulos e Aulas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Módulos do Curso</CardTitle>
            <Button type="button" onClick={addModule} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Módulo
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <Card key={module.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Título do Módulo"
                      value={module.title}
                      onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Descrição do Módulo"
                      value={module.description}
                      onChange={(e) => updateModule(moduleIndex, 'description', e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeModule(moduleIndex)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Aulas</h4>
                    <Button
                      type="button"
                      onClick={() => addLesson(moduleIndex)}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Aula
                    </Button>
                  </div>
                  
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="p-3 border rounded-md space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Título da Aula"
                            value={lesson.title}
                            onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'title', e.target.value)}
                          />
                          <Input
                            placeholder="Descrição da Aula"
                            value={lesson.description}
                            onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'description', e.target.value)}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="URL do Vídeo"
                              value={lesson.videoUrl}
                              onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'videoUrl', e.target.value)}
                            />
                            <Input
                              placeholder="Duração (ex: 15:30)"
                              value={lesson.duration}
                              onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'duration', e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLesson(moduleIndex, lessonIndex)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
          {course ? 'Atualizar' : 'Criar'} Curso
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
