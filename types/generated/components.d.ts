import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'faq';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    question: Schema.Attribute.Text;
  };
}

export interface SharedSource extends Struct.ComponentSchema {
  collectionName: 'components_shared_sources';
  info: {
    displayName: 'source';
    icon: 'link';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.faq': SharedFaq;
      'shared.source': SharedSource;
    }
  }
}
