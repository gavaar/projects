import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoyInput } from '@libs/moy-input/moy-input.models';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import { MergeStrategy } from '@libs/moy-table/row/row.models';

type CallMap = { [source: string]: { [target: string]: { date: string, user: string, duration: string, troncal: string }[] } };

@Component({
  templateUrl: './uploader.component.html',
})
export class UploaderComponent {
  analyzerConfig = new FormGroup({
    minimumCalls: new FormControl(2, Validators.min(1)),
    minimumDuration: new FormControl(5),
  });
  tableConfig = new MoyTable({
    noDataMessage: 'Sube un csv para analizarlo!',
    columns: {
      source: { type: MoyInput },
      target: { type: MoyInput },
      date: { type: MoyInput },
      duration: { type: MoyInput },
      user: { type: MoyInput },
      troncal: { type: MoyInput },
    },
    mergeStrategy: {
      source: MergeStrategy.Pivot,
      date: MergeStrategy.Last,
      duration: MergeStrategy.Sum,
    }
  });

  onCsvUpload(csvEvent) {
    this.tableConfig.setLoading();
    const csv = csvEvent.target.files[0];
    const reader = new FileReader();

    reader.readAsText(csv);
    reader.onload = () => {
      const { result } = reader;
      const rows = (result as string).split(/\r|\n|\r/);
      const callMap = rows.reduce((callMap, rowString) => {
        if (!rowString) return callMap;
        const indexMap = ['date', 'user', 'source', 'target', 'duration', 'troncal'];
        let sourcePhone = '';
        let targetPhone = '';
        const sourceAction = {};
        rowString.split(';').forEach((strValue, index) => {
          const trimmed = strValue.trim();
          const attribute = indexMap[index];

          if (attribute === 'source') sourcePhone = trimmed.toLowerCase();
          else if (attribute === 'target') targetPhone = trimmed.toLowerCase();
          else sourceAction[attribute] = trimmed;
        });

        if (!callMap[sourcePhone]) callMap[sourcePhone] = {};
        if (!callMap[sourcePhone][targetPhone]) callMap[sourcePhone][targetPhone] = [];
        callMap[sourcePhone][targetPhone].push(sourceAction);
        return callMap;
      }, {});

      const filteredCallMap = this.filterCalls(callMap);
      const rowsForTable = this.buildRowsForTable(filteredCallMap);
      this.tableConfig.addRows(rowsForTable);
    };
  }

  private filterCalls(callMap: CallMap): CallMap {
    const { minimumCalls, minimumDuration } = this.analyzerConfig.value;

    Object.keys(callMap).forEach(source => {
      Object.keys(callMap[source]).forEach(target => {
        // minimum required calls
        if (callMap[source][target].length < minimumCalls) {
          delete callMap[source][target];
        }
        // minimum call duration
        else if (callMap[source][target].find(call => +call.duration > +minimumDuration)) {
          delete callMap[source][target];
        }
      });

      if (!Object.keys(callMap[source]).length) delete callMap[source];
    });

    return callMap;
  }

  private buildRowsForTable(callMap: CallMap) {
    const calls = [];
    Object.keys(callMap).forEach(source => {
      Object.keys(callMap[source]).forEach(target => {
        callMap[source][target].forEach((call, index) => {
          const { date, duration, user, troncal } = call;
          calls.push({ source, target, date, duration, user, troncal });
        });
      });
    });

    return calls;
  }
}
