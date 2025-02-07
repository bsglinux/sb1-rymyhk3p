import { Observable } from '@nativescript/core';
import { Message } from '../../models/message.model';

export class HomeViewModel extends Observable {
    private _messages: Array<Message> = [];
    private _userInput: string = '';
    private _isOffline: boolean = false;

    constructor() {
        super();
        this.checkConnectivity();
    }

    get messages(): Array<Message> {
        return this._messages;
    }

    get userInput(): string {
        return this._userInput;
    }

    set userInput(value: string) {
        if (this._userInput !== value) {
            this._userInput = value;
            this.notifyPropertyChange('userInput', value);
        }
    }

    async sendMessage() {
        if (!this.userInput.trim()) return;

        // Add user message
        this._messages.push({
            type: 'user',
            content: this.userInput,
            timestamp: new Date()
        });
        this.notifyPropertyChange('messages', this._messages);

        const userMessage = this.userInput;
        this.userInput = '';

        // Simulate AI response
        if (this._isOffline) {
            this._messages.push({
                type: 'assistant',
                content: 'Sorry, I can only provide limited responses while offline.',
                timestamp: new Date()
            });
        } else {
            // Add loading message
            const loadingIndex = this._messages.length;
            this._messages.push({
                type: 'assistant',
                content: 'Thinking...',
                timestamp: new Date(),
                isLoading: true
            });
            this.notifyPropertyChange('messages', this._messages);

            // Simulate API call delay
            setTimeout(() => {
                this._messages[loadingIndex] = {
                    type: 'assistant',
                    content: `This is a simulated response to: "${userMessage}"`,
                    timestamp: new Date()
                };
                this.notifyPropertyChange('messages', this._messages);
            }, 1500);
        }
    }

    startVoiceInput() {
        // Implement voice input logic
        console.log('Voice input started');
    }

    playAudio(args) {
        // Implement text-to-speech
        console.log('Playing audio');
    }

    shareMessage(args) {
        // Implement share functionality
        console.log('Sharing message');
    }

    private checkConnectivity() {
        // Implement connectivity check
        this._isOffline = false;
    }
}