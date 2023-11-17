import { Token } from "../../../actions/environment/header-configure";
import { ApiUrls } from "../../../api-urls";
import GridView from "../../grid";

export default function Columns(props: any) {
  return (
      <GridView
        {...props}
        heading={"Columns List"}
        addUrl={"/admin/columns/create"}
        listName={"columns"}
        ColumnFetchApi={ApiUrls.COLUMNSFETCH}
        DataFetchApi={ApiUrls.COLUMNLIST}
        viewURL={"#"}
        editURL={"/admin/columns/update/"}
        token={Token().adminToken}
        statusApi={ApiUrls.COLUMNSSTATUSUPDATE}
        deleteApi={'#'}
      />
  );
}