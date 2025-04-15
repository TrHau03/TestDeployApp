import { ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define prop types for custom components
type ChildrenProps = {
  children: ReactNode;
};

type LinkProps = {
  href: string;
  children: ReactNode;
};

type TableCellProps = {
  isHeader: boolean;
  children: ReactNode;
};

type ListProps = {
  ordered: boolean;
  children: ReactNode;
};

type ImageProps = {
  src?: string;
  alt?: string;
  [key: string]: any;
};

// Custom components for markdown elements
const CustomParagraph: React.FC<ChildrenProps> = ({ children }) => <p className="leading-relaxed mb-4">{children}</p>;

const CustomEmphasis: React.FC<ChildrenProps> = ({ children }) => <em>{children}</em>;

const CustomStrong: React.FC<ChildrenProps> = ({ children }) => <strong>{children}</strong>;

const CustomLink: React.FC<LinkProps> = ({ href, children }) => (
  <a href={href} className="underline" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const CustomHeading1: React.FC<ChildrenProps> = ({ children }) => (
  <h1 className="text-2xl font-bold my-6">{children}</h1>
);

const CustomHeading2: React.FC<ChildrenProps> = ({ children }) => (
  <h2 className="text-xl font-semibold my-5">{children}</h2>
);

const CustomHeading3: React.FC<ChildrenProps> = ({ children }) => (
  <h3 className="text-lg font-medium my-4">{children}</h3>
);

const CustomBlockquote: React.FC<ChildrenProps> = ({ children }) => (
  <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic">{children}</blockquote>
);

const CustomList: React.FC<ListProps> = ({ ordered, children }) => {
  const className = ordered ? 'list-decimal pl-6 my-4 space-y-2' : 'list-disc pl-6 my-4 space-y-2';

  return ordered ? <ol className={className}>{children}</ol> : <ul className={className}>{children}</ul>;
};

const CustomListItem: React.FC<ChildrenProps> = ({ children }) => <li className="pl-2">{children}</li>;

// Table related components
const CustomTable: React.FC<ChildrenProps> = ({ children }) => (
  <div className="overflow-x-auto my-6">
    <table className="min-w-full border border-gray-300 rounded-lg">{children}</table>
  </div>
);

const CustomTableHead: React.FC<ChildrenProps> = ({ children }) => <thead className="bg-gray-100">{children}</thead>;

const CustomTableBody: React.FC<ChildrenProps> = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const CustomTableRow: React.FC<ChildrenProps> = ({ children }) => <tr>{children}</tr>;

const CustomTableCell: React.FC<TableCellProps> = ({ isHeader, children }) => {
  return isHeader ? (
    <th className="px-4 py-3 text-left text-sm font-medium">{children}</th>
  ) : (
    <td className="px-4 py-3 text-sm">{children}</td>
  );
};

const CustomHorizontalRule: React.FC = () => <hr className="my-8 border-t-2 border-gray-200" />;

const CustomImage: React.FC<ImageProps> = ({ src, alt, ...props }) => (
  <div className="my-4">
    <img src={src} alt={alt} className="max-w-full h-auto rounded-lg shadow-md" {...props} />
    {alt && <p className="text-center text-sm mt-2">{alt}</p>}
  </div>
);

// Simple inline code without syntax highlighting
const CustomInlineCode: React.FC<ChildrenProps> = ({ children }) => (
  <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm text-gray-900">{children}</code>
);

type Props = {
  children: string;
};
export default function MarkdownRenderer({ children }: Props) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <CustomParagraph>{children}</CustomParagraph>,
        em: ({ children }) => <CustomEmphasis>{children}</CustomEmphasis>,
        strong: ({ children }) => <CustomStrong>{children}</CustomStrong>,
        a: ({ href, children }) => <CustomLink href={href || ''}>{children}</CustomLink>,
        h1: ({ children }) => <CustomHeading1>{children}</CustomHeading1>,
        h2: ({ children }) => <CustomHeading2>{children}</CustomHeading2>,
        h3: ({ children }) => <CustomHeading3>{children}</CustomHeading3>,
        blockquote: ({ children }) => <CustomBlockquote>{children}</CustomBlockquote>,
        ul: ({ children }) => <CustomList ordered={false}>{children}</CustomList>,
        ol: ({ children }) => <CustomList ordered={true}>{children}</CustomList>,
        li: ({ children }) => <CustomListItem>{children}</CustomListItem>,
        code: ({ children }) => <CustomInlineCode>{children}</CustomInlineCode>,
        table: ({ children }) => <CustomTable>{children}</CustomTable>,
        thead: ({ children }) => <CustomTableHead>{children}</CustomTableHead>,
        tbody: ({ children }) => <CustomTableBody>{children}</CustomTableBody>,
        tr: ({ children }) => <CustomTableRow>{children}</CustomTableRow>,
        th: ({ children }) => <CustomTableCell isHeader={true}>{children}</CustomTableCell>,
        td: ({ children }) => <CustomTableCell isHeader={false}>{children}</CustomTableCell>,
        hr: () => <CustomHorizontalRule />,
        img: ({ src, alt, ...props }) => <CustomImage src={src} alt={alt} {...props} />,
      }}
    >
      {children}
    </Markdown>
  );
}
