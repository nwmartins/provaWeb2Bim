import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacina } from '../../model/vacina';
import { VacinaService } from '../../vacina.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { container } from '@angular/core/src/render3';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogComponent } from '../../../../shared/dialog/dialog/dialog.component'

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vacina-list',
  templateUrl: './vacina-list.component.html',
  styleUrls: ['./vacina-list.component.css']
})
export class VacinaListComponent implements OnInit {

  displayedColumns: string[] = ['actionsColumn', 'id', 'descMedicamento', 'dtVacina', 'peso', 'dosagem', 
  'aplicador', 'idAnimal'];  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;     

 public vacinaModel: Vacina = new Vacina();
 public vacinas: Array<Vacina> = new Array<Vacina>();
 public dataSource: any;

 constructor(private vacinaService: VacinaService, 
   private router: Router,
   private dialog: MatDialog,
   private datePipe: DatePipe,
   public spinner: NgxSpinnerService) { }

 ngOnInit() {
   this.getAll();
 }

 getAll() {
   this.spinner.show();
   console.log("listall");
   this.vacinaService.getAll().subscribe(sucesso => {
     if (sucesso != null) 
       console.log(sucesso);
       this.refreshTable(sucesso);
       this.spinner.hide();        
   },
   error => {
     this.spinner.hide();
     console.log(error);
   });    
 }

 private refreshTable(sucesso: any) {
   this.dataSource = new MatTableDataSource<Vacina>(sucesso);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }

 editVacina(id: number){
   this.router.navigate(['../vacina-edit/'+id]);  
 }

 deleteVacina(id: number){
   this.vacinaService.delete(id).subscribe(sucesso => {      
     if (sucesso != null) 
       console.log(sucesso);
       this.dataSource = new MatTableDataSource<Vacina>(sucesso);
       this.getAll();
   },
   error => {
     console.log(error);
   });
   
 }

 deleteConfirmation(id: number) {
   let dialogRef = this.dialog.open(DialogComponent, {
     panelClass: 'custom-dialog',
     data: 'Confirmar exclusão do registro ?',
     disableClose: true
     
   });
   dialogRef.afterClosed().subscribe(isConfirm => {
     console.log(isConfirm);
     if(isConfirm)
       this.deleteVacina(id);
   })
   
 }

 callNew(){
   this.router.navigate(['../vacina']);    
 }


}
