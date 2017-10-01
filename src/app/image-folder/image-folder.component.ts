import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from "./image-service";

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.component.html',
  styleUrls: ['./image-folder.component.css']
})
export class ImageFolderComponent implements OnInit {
  private id: string;
  public data: {images:string[]} = {images: []};

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.imageService.getImages(this.id).subscribe((data) => {
          this.data = data != null ? data : {images:[]};
      });
   });
  }

}
