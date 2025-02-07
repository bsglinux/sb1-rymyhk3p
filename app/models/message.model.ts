export interface Message {
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isLoading?: boolean;
}