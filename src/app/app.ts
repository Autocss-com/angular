import { Component, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Item {
  [key: string]: string;
}

interface DataRecord {
  id: string;
  title: string;
  intro: string;
  items: Item[];
}

type Status = 'loading' | 'ready' | 'error';

// This framework's own data layer: fetch its data at runtime.
// A document-base-relative path keeps the URL correct under the GitHub
// Pages project subpath (<base href="/angular/">). The JSON uses the same
// shape the AutoCSS UI consumes, so a later stage can render this same
// data remotely.
const DATA_URL = 'data/records.json';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly status = signal<Status>('loading');
  protected readonly records = signal<DataRecord[]>([]);

  protected readonly record = computed(() => this.records()[0]);
  protected readonly columns = computed(() => {
    const first = this.record()?.items?.[0];
    return first ? Object.keys(first) : [];
  });

  constructor(private readonly http: HttpClient) {
    this.http.get<DataRecord[]>(DATA_URL).subscribe({
      next: (data) => {
        this.records.set(data);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
    });
  }
}
