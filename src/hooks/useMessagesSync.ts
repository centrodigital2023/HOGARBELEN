import { useCallback } from 'react';
import { useRealtimeSync } from './useRealtimeSync';
import { toast } from 'sonner';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'professional' | 'family' | 'admin';
  recipient_id: string;
  recipient_role: 'professional' | 'family' | 'admin';
  content: string;
  read: boolean;
  created_at: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participant_ids: string[];
  participant_names: string[];
  participant_roles: string[];
  last_message?: string;
  last_message_at?: string;
  unread_count: { [userId: string]: number };
  created_at: string;
}

export function useMessagesSync(userId?: string) {
  const { data: messages, updateData: updateMessages, refresh: refreshMessages } = useRealtimeSync<Message[]>({
    key: 'messages',
    syncInterval: 2000,
    onUpdate: (data) => {
      if (!userId) return;
      
      const userMessages = data?.filter(
        (m: Message) => m.recipient_id === userId && !m.read
      ) || [];

      const lastMessage = userMessages[userMessages.length - 1];
      if (lastMessage && Date.now() - new Date(lastMessage.created_at).getTime() < 5000) {
        toast.info(`Nuevo mensaje de ${lastMessage.sender_name}`);
      }
    }
  }, []);

  const { data: conversations, updateData: updateConversations, refresh: refreshConversations } = useRealtimeSync<Conversation[]>({
    key: 'conversations',
    syncInterval: 2000
  }, []);

  const userMessages = userId 
    ? (messages || []).filter(m => m.sender_id === userId || m.recipient_id === userId)
    : messages || [];

  const userConversations = userId
    ? (conversations || []).filter(c => c.participant_ids.includes(userId))
    : conversations || [];

  const sendMessage = useCallback(async (
    recipientId: string,
    recipientRole: 'professional' | 'family' | 'admin',
    content: string,
    senderName: string,
    senderRole: 'professional' | 'family' | 'admin'
  ) => {
    if (!userId) return;

    let conversationId = userConversations.find(
      c => c.participant_ids.includes(recipientId)
    )?.id;

    if (!conversationId) {
      conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await updateConversations((current) => {
        const list = current || [];
        return [...list, {
          id: conversationId!,
          participant_ids: [userId, recipientId],
          participant_names: [senderName, 'Usuario'],
          participant_roles: [senderRole, recipientRole],
          last_message: content,
          last_message_at: new Date().toISOString(),
          unread_count: { [recipientId]: 1 },
          created_at: new Date().toISOString()
        }];
      });
    } else {
      await updateConversations((current) => {
        const list = current || [];
        return list.map(conv => 
          conv.id === conversationId
            ? {
                ...conv,
                last_message: content,
                last_message_at: new Date().toISOString(),
                unread_count: {
                  ...conv.unread_count,
                  [recipientId]: (conv.unread_count[recipientId] || 0) + 1
                }
              }
            : conv
        );
      });
    }

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      conversation_id: conversationId,
      sender_id: userId,
      sender_name: senderName,
      sender_role: senderRole,
      recipient_id: recipientId,
      recipient_role: recipientRole,
      content,
      read: false,
      created_at: new Date().toISOString()
    };

    await updateMessages((current) => {
      const list = current || [];
      return [...list, newMessage];
    });

    toast.success('Mensaje enviado');
    return newMessage;
  }, [userId, userConversations, updateMessages, updateConversations]);

  const markAsRead = useCallback(async (messageId: string) => {
    await updateMessages((current) => {
      const list = current || [];
      return list.map(msg => 
        msg.id === messageId 
          ? { ...msg, read: true }
          : msg
      );
    });
  }, [updateMessages]);

  const markConversationAsRead = useCallback(async (conversationId: string) => {
    if (!userId) return;

    await updateMessages((current) => {
      const list = current || [];
      return list.map(msg => 
        msg.conversation_id === conversationId && msg.recipient_id === userId
          ? { ...msg, read: true }
          : msg
      );
    });

    await updateConversations((current) => {
      const list = current || [];
      return list.map(conv => 
        conv.id === conversationId
          ? {
              ...conv,
              unread_count: {
                ...conv.unread_count,
                [userId]: 0
              }
            }
          : conv
      );
    });
  }, [userId, updateMessages, updateConversations]);

  return {
    messages: userMessages,
    conversations: userConversations,
    sendMessage,
    markAsRead,
    markConversationAsRead,
    refresh: () => {
      refreshMessages();
      refreshConversations();
    }
  };
}
