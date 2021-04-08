import { AbstractMoyInput } from '../../moy-input';
import { MoyColumnConfig } from '../column/column';

export interface MoyCellConfig<K> extends MoyColumnConfig {
  value?: K;
}

export class MoyCell<K> {
  content: AbstractMoyInput<K>;

  constructor(config: MoyCellConfig<K>) {
    const { class: MoyInput, controlOptions, value } = config;
    this.content = new MoyInput({ value: value, controlOptions: controlOptions });
  }
}