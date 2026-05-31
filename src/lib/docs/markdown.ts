import { createMarkdownProcessor, type MarkdownRenderer } from '@astrojs/markdown-remark';

let markdownProcessorPromise: Promise<MarkdownRenderer> | undefined;

export function getMarkdownProcessor(): Promise<MarkdownRenderer> {
  if (!markdownProcessorPromise) {
    markdownProcessorPromise = createMarkdownProcessor({
      syntaxHighlight: false,
    });
  }
  return markdownProcessorPromise;
}
