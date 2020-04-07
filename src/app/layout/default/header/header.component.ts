import { Component, ChangeDetectionStrategy, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
@Injectable()
@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  searchToggleStatus: boolean;
  isKnowledgePage = false;
  currentGraphName: string;
  info;

  constructor(private router: Router, public settings: SettingsService) {}

  ngOnInit() {}

  toggleCollapsedSidebar(): void {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange(): void {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
