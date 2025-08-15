import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-snippet-card',
  imports: [FormsModule,CommonModule],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss',
  host:{'[class.expand]':'isExpanded'}
})
export class SnippetCardComponent {
    protected snippetText!:string;

    protected isExpanded: boolean = false;

    protected snippetClick():void{
      const text = this.snippetText.trim();
      const urlPattern =/^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

      if(urlPattern.test(text)){
        window.open(text,'_blank');
      }else if(text){
        navigator.clipboard.writeText(text)
        .then(()=>{
          console.log("Text copied to clipboard,",text)
        })
        .catch(err => console.error('Could not copy text:',err))
      }
    }
    protected expandTextArea(): void {
      this.isExpanded = !this.isExpanded;
      console.log("clicked");
    }

}