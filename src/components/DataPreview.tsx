import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DataPreviewProps {
  data: string[][];
  fileName: string;
}

const DataPreview = ({ data, fileName }: DataPreviewProps) => {
  if (data.length === 0) return null;

  const headers = data[0];
  const rows = data.slice(1, 11); // Show first 10 rows

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Data Preview
        </h3>
        <span className="text-muted-foreground text-sm">
          Showing {rows.length} of {data.length - 1} records
        </span>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-secondary/50">
              {headers.map((header, index) => (
                <TableHead 
                  key={index} 
                  className="text-foreground font-semibold bg-secondary/50"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                className="border-border hover:bg-secondary/30 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex} 
                    className="text-foreground/80"
                  >
                    {cell || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default DataPreview;
