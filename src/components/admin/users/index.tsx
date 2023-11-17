import { Token } from "../../../actions/environment/header-configure";
import { ApiUrls } from "../../../api-urls";
import GridView from "../../grid";

export default function Users(props: any) {
  return (
      <GridView
        {...props}
        heading={"User List"}
        addUrl={"/admin/users/create"}
        listName={"users"}
        ColumnFetchApi={ApiUrls.COLUMNSFETCH}
        DataFetchApi={ApiUrls.USERLIST}
        viewURL={"#"}
        editURL={"/admin/users/update/"}
        token={Token().adminToken}
        statusApi={ApiUrls.USERSTATUSUPDATE}
        deleteApi={ApiUrls.USERDELETE}
      />
  );
}
