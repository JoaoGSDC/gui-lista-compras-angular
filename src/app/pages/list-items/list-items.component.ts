import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListItemsService } from 'src/services/list-items.service';

interface List {
  id: number;
  item: string;
}

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: ListItemsService) { }

  form!: FormGroup;

  listItems: List[] = [];
  item!: List;

  ngOnInit(): void {
    this.setFormBuilder();
    this.getItems();
  }

  setFormBuilder(): void {
    this.form = this.formBuilder.group({
      item: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.item !== null && this.item?.id > 0) {
      this.updateItem(this.item);
    } else {
      this.insertItem();
    }
  }

  getItems(): void {
    this.service.getItems().subscribe((items: List[]) => {
      this.listItems = items;
    });
  }

  insertItem(): void {
    const item: List = {
      id: 0,
      item: this.form.value.item
    }

    this.form.reset();

    this.service.insertItem(item).subscribe((items: List[]) => {
      this.listItems = items;
    });

    this.item = {} as List;
  }

  updateItem(item: List): void {
    this.item = {} as List;
    item.item = this.form.value.item;

    this.form.reset();

    this.service.updateItem(item).subscribe((items: List[]) => {
      this.listItems = items;
    });
  }

  deleteItemList(item: List): void {
    this.service.deleteItem(item).subscribe((items: List[]) => {
      this.listItems = items;

      this.item = {} as List;
      this.form.reset();
    });
  }

  setItemValue(item: List): void {
    this.item = item;

    this.form.controls['item'].setValue(item.item);
  }

}
