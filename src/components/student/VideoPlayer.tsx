
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lesson } from '@/types/student';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Clock,
  CheckCircle2,
  Circle
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const getVideoEmbedUrl = (videoUrl: string, videoType: 'youtube' | 'vimeo') => {
    if (videoType === 'youtube') {
      return `https://www.youtube.com/embed/${videoUrl}?enablejsapi=1&rel=0&modestbranding=1`;
    } else {
      return `https://player.vimeo.com/video/${videoUrl}?title=0&byline=0&portrait=0`;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div 
            className="relative aspect-video bg-black rounded-t-lg overflow-hidden group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <iframe
              src={getVideoEmbedUrl(lesson.videoUrl, lesson.videoType)}
              title={lesson.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Custom Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
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

            {/* Mark as Complete */}
            <div className="flex items-center justify-between border-t pt-4">
              <Button
                onClick={onMarkComplete}
                variant={isCompleted ? "default" : "outline"}
                className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
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
            <div className="space-y-2">
              {lesson.materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{material.title}</h4>
                    <p className="text-sm text-gray-600 capitalize">{material.type}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                      Baixar
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
