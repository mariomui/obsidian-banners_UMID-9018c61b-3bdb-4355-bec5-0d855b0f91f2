import { WidgetType } from "@codemirror/view";

import BannersPlugin from "../main";
import { IBannerMetadata } from "../MetaManager";
import getBannerElements from "../Banner";

export default class BannerWidget extends WidgetType {
  plugin: BannersPlugin;
  bannerData: IBannerMetadata;
  filepath: string;
  contentEl: HTMLElement;
  removeListeners: () => void;

  constructor(plugin: BannersPlugin, bannerData: IBannerMetadata, filepath: string, contentEl: HTMLElement) {
    super();
    this.plugin = plugin;
    this.bannerData = bannerData;
    this.filepath = filepath;
    this.contentEl = contentEl;
    this.removeListeners = () => {};
  }

  eq(widget: BannerWidget): boolean {
    const { bannerData: { src, x, y, lock }, filepath } = widget;
    return (
      this.bannerData.src === src &&
      this.bannerData.x === x &&
      this.bannerData.y === y &&
      this.bannerData.lock === lock &&
      this.filepath === filepath
    );
  }

  toDOM(): HTMLElement {
    const { plugin, bannerData, filepath, contentEl } = this;
    const wrap = document.createElement('div');
    wrap.addClass('obsidian-banner', 'cm6-banner', plugin.settings.style);

    const { elements, removeListeners } = getBannerElements(plugin, bannerData, filepath, wrap, contentEl);
    wrap.append(...elements);
    this.removeListeners = removeListeners;
    return wrap;
  }

  destroy() {
    this.removeListeners();
  }
}
