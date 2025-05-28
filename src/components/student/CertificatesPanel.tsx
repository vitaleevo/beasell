
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Certificate } from '@/types/student';
import { 
  Award, 
  Download, 
  Share, 
  ExternalLink,
  Calendar,
  Shield
} from 'lucide-react';

interface CertificatesPanelProps {
  certificates: Certificate[];
  onDownload: (certificateId: string) => void;
  onShare: (certificateId: string) => void;
}

const CertificatesPanel: React.FC<CertificatesPanelProps> = ({
  certificates,
  onDownload,
  onShare
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Meus Certificados</span>
          <Badge variant="outline">{certificates.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {certificates.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Award className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum certificado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Complete cursos para ganhar certificados oficiais
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-blue-900 rounded-full">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Certificado de Conclusão
                        </h3>
                        <p className="text-blue-700 font-medium">
                          Curso ID: {certificate.courseId}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Emitido em: {formatDate(certificate.issuedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>Código: {certificate.verificationCode}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <p>
                        Este certificado comprova a conclusão bem-sucedida do curso,
                        demonstrando o domínio das competências e conhecimentos apresentados.
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => onDownload(certificate.id)}
                        className="bg-blue-900 hover:bg-blue-800"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onShare(certificate.id)}
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Compartilhar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(certificate.certificateUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificatesPanel;
