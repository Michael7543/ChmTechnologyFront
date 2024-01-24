import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { LayoutModule } from '../menu/layout.module';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { PanelModule } from 'primeng/panel';
import { MegaMenuModule } from 'primeng/megamenu';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    KeyFilterModule,
    PickListModule,
    DockModule,
    TabMenuModule,
    MenubarModule,
    BreadcrumbModule,
    TabViewModule,
    SplitterModule,
    DividerModule,
    ImageModule,
    SkeletonModule,
    BadgeModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SidebarModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    CardModule,
    CarouselModule,
    PanelModule,
    MegaMenuModule
  ],
  exports:[
    MenuModule,
    KeyFilterModule,
    PickListModule,
    DockModule,
    TabMenuModule,
    MenubarModule,
    BreadcrumbModule,
    TabViewModule,
    SplitterModule,
    DividerModule,
    ImageModule,
    SkeletonModule,
    BadgeModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SidebarModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    CarouselModule,
    PanelModule,
    MegaMenuModule

  ],
  declarations: [],
  providers:[MessageService]
})
export class PrimengModule { }
