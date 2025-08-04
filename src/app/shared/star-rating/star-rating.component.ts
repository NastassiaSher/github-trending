import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule, MatIconModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {
  
  @Input() defaultRating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  rating = 0;
  maxRating = 5;
  stars: number[] = [];

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i);
  }

  ngOnInit() {
    this.rating = this.defaultRating;
  }

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  isFilled(index: number): boolean {
    return index < this.rating;
  }
}
