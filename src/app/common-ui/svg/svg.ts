import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  imports: [],
  template: `
    <svg attr.width="{{width}}" attr.height="{{height}}" viewBox="0 0 15 15" attr.fill="{{fill}}" attr.class="{{class}}">
      <use attr.href="/assets/svg/{{icon}}.svg#{{icon}}"></use>
    </svg>
  `,
  styles: [':host {display: flex; align-items: center; justify-content: center;}'],
})
export class Svg {
  @Input() icon!: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() size?: number = 24;
  @Input() fill?: string;
  @Input() class?: string;

  ngOnInit(): void {
    if (!this.width || !this.height) {
      this.width = this.size;
      this.height = this.size;
    }
  }

}
