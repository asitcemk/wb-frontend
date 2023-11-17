import { Token } from "../../../actions/environment/header-configure";
import { ApiUrls } from "../../../api-urls";
import GridView from "../../grid";

export default function Internationalization(props: any) {
  return (
      <GridView
        {...props}
        heading={"Internationalization List"}
        addUrl={"#"}
        listName={"internationalization"}
        ColumnFetchApi={ApiUrls.COLUMNSFETCH}
        DataFetchApi={ApiUrls.INTERNATIONALIZATIONLIST}
        viewURL={"#"}
        editURL={"/admin/internationalization/update/"}
        token={Token().adminToken}
        statusApi={ApiUrls.INTERNATIONALIZATIONSTATUSUPDATE}
        deleteApi={ApiUrls.INTERNATIONALIZATIONDELETE}
      />
  );
}
