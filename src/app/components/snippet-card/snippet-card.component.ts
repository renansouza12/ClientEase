import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Snippet } from '../../models/snippet.interface';
import { SnippetService } from '../../services/snippets/snippet.service';

@Component({
    selector: 'app-snippet-card',
    imports: [FormsModule, CommonModule, CdkDragHandle, CdkDrag],
    templateUrl: './snippet-card.component.html',
    styleUrl: './snippet-card.component.scss',
    host: { '[class.expand]': 'isExpanded' }
})
export class SnippetCardComponent implements OnInit,OnChanges {
    @Input() snippet!: Snippet;

    protected snippetText: string = '';
    protected snippetTitle: string = '';
    protected notificationText: string = "Notification message";
    protected isExpanded: boolean = false;
    protected showNotification: boolean = false;

    private snippetService = inject(SnippetService);
    private saveTimeout: any;


    ngOnInit(): void {
        this.initializeFromSnippet();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['snippet'] && !changes['snippet'].firstChange) {
            if (changes['snippet'].currentValue.isExpanded !== this.isExpanded) {
                this.isExpanded = changes['snippet'].currentValue.isExpanded || false;
            }
        }
    }

    private initializeFromSnippet(): void {
        this.snippetText = this.snippet.text || '';
        this.snippetTitle = this.snippet.title || '';
        this.isExpanded = this.snippet.isExpanded || false;
    }


    protected onTitleChange(title: string): void {
        this.snippetTitle = title;
        this.debouncedSave();
    }

    protected onTextChange(text: string): void {
        this.snippetText = text;
        this.debouncedSave();
    }

    protected snippetClick(): void {
        const text = this.snippetText;
        const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

        if (urlPattern.test(text)) {
            window.open(text, '_blank');
        } else if (text) {
            navigator.clipboard.writeText(text)
            .then(() => {
                this.notificationText = "Text copied to clipboard!";
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 2000);
            })
            .catch(err => console.error('Could not copy text:', err));
        }
    }

    protected async expandTextArea(): Promise<void> {
        this.isExpanded = !this.isExpanded;

        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        await this.saveSnippet();
    }  

    private debouncedSave(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(() => {
            this.saveSnippet();
        }, 1500);
    }

    private async saveSnippet(): Promise<void> {
        try {
            const updatedSnippet: Snippet = {
                ...this.snippet,
                title: this.snippetTitle,
                text: this.snippetText,
                isExpanded: this.isExpanded
            };

            await this.snippetService.updateSnippet(updatedSnippet);
        } catch (error) {
            console.error('Error saving snippet:', error);
        }
    }
}
