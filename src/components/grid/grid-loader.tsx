import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";

interface GridLoaderProps {
  columns: any[];
  rowsPerPage: number;
}

export default function GridLoader(props: GridLoaderProps) {
  const { columns, rowsPerPage } = props;
  const rows = [];
  var count = 10;
  count = rowsPerPage > 25 ? 25 : rowsPerPage;
  for (var i = 0; i < count; i++) {
    rows.push(i);
  }
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {columns.map((col: any, i: any) => {
            return (
              <TableCell key={i}>
                <Skeleton animation="wave" />
              </TableCell>
            );
          })}
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
