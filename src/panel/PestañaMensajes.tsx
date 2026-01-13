import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaperPlaneRight, User } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  senderName: string;
  senderPhoto?: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const PestañaMensajes = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      senderName: 'María González',
      message: '¿Podría confirmar la cita para el próximo martes?',
      timestamp: '2024-01-15T10:30:00',
      read: false
    },
    {
      id: '2',
      senderName: 'Juan Pérez',
      message: 'Gracias por la consulta de hoy. Me siento mucho mejor.',
      timestamp: '2024-01-14T15:45:00',
      read: true
    },
    {
      id: '3',
      senderName: 'Ana Martínez',
      message: '¿Qué documentos debo llevar a la próxima sesión?',
      timestamp: '2024-01-14T09:20:00',
      read: true
    }
  ];

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      console.log('Enviando respuesta:', replyText);
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Mensajes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {messages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-muted' : ''
                } ${!message.read ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold text-sm ${!message.read ? 'text-primary' : 'text-foreground'}`}>
                        {message.senderName}
                      </span>
                      {!message.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {message.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.timestamp).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedMessage ? selectedMessage.senderName : 'Selecciona un mensaje'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{selectedMessage.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{selectedMessage.senderName}</div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.timestamp).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-foreground">{selectedMessage.message}</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Tu respuesta
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Escribe tu respuesta..."
                />
                <div className="flex justify-end">
                  <Button onClick={handleSendReply}>
                    <PaperPlaneRight size={16} />
                    Enviar Respuesta
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <User size={48} className="mx-auto mb-4 opacity-50" />
              <p>Selecciona un mensaje para ver la conversación</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PestañaMensajes;
