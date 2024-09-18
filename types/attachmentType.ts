// types.ts

export type AttachmentType = {
    type: 'video' | 'audio' | 'image';
    uri: string;  // Path or URI to the attachment
    name?: string;  // Optional name for the attachment
  };
  