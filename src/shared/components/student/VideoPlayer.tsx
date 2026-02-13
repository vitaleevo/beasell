"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Lesson } from '@/shared/types/student';
import {
  Clock,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  Link as LinkIcon
} from 'lucide-react';

interface VideoPlayerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lesson,
  isCompleted,
  onMarkComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const getVideoEmbedUrl = (videoUrl: string, videoType: 'youtube' | 'vimeo') => {
    if (videoType === 'youtube') {
      return `https://www.youtube.com/embed/${videoUrl}?rel=0&modestbranding=1&showinfo=0`;
    } else {
      return `https://player.vimeo.com/video/${videoUrl}?title=0&byline=0&portrait=0&color=1e40af`;
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [lesson.id]);

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Carregando vídeo...</p>
                </div>
              </div>
            ) : (
              <iframe
                src={getVideoEmbedUrl(lesson.videoUrl, lesson.videoType)}
                title={lesson.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>

          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {lesson.title}
                </h2>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{lesson.duration}</span>
                </Badge>
                <Badge
                  variant={lesson.videoType === 'youtube' ? 'destructive' : 'default'}
                  className="capitalize"
                >
                  {lesson.videoType}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t pt-4">
              <Button
                onClick={onMarkComplete}
                variant={isCompleted ? "default" : "outline"}
                className={isCompleted ? "bg-green-600 hover:bg-green-700 text-white" : ""}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Aula Concluída
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4 mr-2" />
                    Marcar como Concluída
                  </>
                )}
              </Button>

              <div className="flex items-center space-x-2">
                {hasPrevious && (
                  <Button variant="outline" onClick={onPrevious}>
                    Aula Anterior
                  </Button>
                )}
                {hasNext && (
                  <Button onClick={onNext} className="bg-blue-900 hover:bg-blue-800">
                    Próxima Aula
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Materials */}
      {lesson.materials && lesson.materials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Materiais de Apoio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getMaterialIcon(material.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{material.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">{material.type}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>Acessar</span>
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoPlayer;

