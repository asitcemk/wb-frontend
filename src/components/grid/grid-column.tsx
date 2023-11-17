import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement, SortableHandle, arrayMove, SortableContainerProps, SortableElementProps} from 'react-sortable-hoc';
import { Container, Draggable } from 'react-smooth-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles, Theme } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockIcon from '@mui/icons-material/Lock';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useTranslation } from "react-i18next";
//import { applyDrag } from './utils';
import { saveColumns } from '../../actions/common/columns';

export interface IColumn {
  id: string;
  type: string;
  label: string;
  lock: boolean;
  filter:boolean;
  sort:boolean;
  numeric:boolean;
}


interface IThesis {
  thesis: string;
  samenleving: number;
  ecologie: number;
  economie: number;
}

interface IThesisCard extends IThesis {
  id: string;
  selected: boolean;
  order: number;
}
interface DropResult {
  removedIndex?: number;
  addedIndex?: number;
  payload?: any;
  element?: any;
}

export default function ColumnDialog(props:any) {
  const { t } = useTranslation();
  const { open,listName,token,columns,selectedColumns,changeColumn, handleClose} = props;
  const [selected, setSelected] = React.useState(selectedColumns);
  const [save, setSave] = React.useState(false);
  const [items, setItems] = React.useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [cards, setCards] = React.useState([
      { thesis: "t1", samenleving: 3, ecologie: 5, economie: 10 },
      { thesis: "t2", samenleving: 3, ecologie: 5, economie: 10 },
      { thesis: "t3", samenleving: 3, ecologie: 5, economie: 10 },
      { thesis: "t4", samenleving: 3, ecologie: 5, economie: 10 }
    ].map((thesis: IThesis, i: number) => ({
      ...thesis,
      id: i + "card",
      order: null,
      selected: true
    })) as unknown as IThesisCard[]);

    const applyDrag = (items: Array<IThesisCard>, dropResult: DropResult) => {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === null && addedIndex === null) return items;
  
      const result = [...items];
      let itemToAdd = payload;
  
      if (removedIndex !== null && removedIndex) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
  
      if (addedIndex !== null && addedIndex) {
        result.splice(addedIndex, 0, itemToAdd);
      }
  
      return result;
    };

  const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem: React.ComponentClass<SortableElementProps & { value: string }, any> = SortableElement(({ value }: { value: string }) =>
<div>
<DragHandle />
  {value}
  </div>
);

const SortableList: React.ComponentClass<SortableContainerProps & { items: string[] }, any> = SortableContainer(({ items }: { items: string[] }) => {
  return (
    <div>
      {items.map((value: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});


const onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
  setItems(arrayMove(items, oldIndex, newIndex))
};


  const selectColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newoption=selected;
    let i=columns.find((x:any) => x.id === event.target.value);
    if(event.target.checked){
      newoption.push(i);
    }else{
      let index = selected.findIndex((x:any) => x.id ===event.target.value);
      newoption.splice(index, 1);
    }
    setSelected([...newoption]);    
  };
  const handleSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSave(event.target.checked)
  }
  const applyColumn = () => {
    changeColumn(selected);
    handleClose();
    if(save){
      let formValues:any={};
      formValues.list_name=listName;
      formValues.json_columns=selected;
      saveColumns(formValues, props,token).then(res => {
        console.log(res)
      })
    }
  };

  return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
        maxWidth='md'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="Modify Columns"
        className="column-dialog"
        scroll="body"
      >
        <DialogTitle>
          {t("Modify Columns")}
        </DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
        <Grid container item xs={8}>
        <FormGroup className="column-check">
            {
              columns.map((c:any) => {
                return !c.lock?(
                  <FormControlLabel
                    key={c.id}
                    control={<Checkbox value={c.id} name={c.id} onChange={selectColumn} checked={selected.find((x:any) => x.id === c.id)?true:false}/>}
                    label={t(c.label)}
                  />
                ):null;
              })
            }
        </FormGroup>
        </Grid>
        <Grid container item xs={4}>
        <FormHelperText>{t("Drage and drop to reorder")}</FormHelperText>
        {/* <Scrollbars autoHide style={{height: '50vh',width: '100%' }}> */}
        
        <SortableList items={items} useDragHandle={true} onSortEnd={onSortEnd} />
          {/* </Scrollbars> */}
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid container item xs={12} sm={6}>
              <FormControlLabel
              control={<Checkbox name="save" checked={save} onChange={handleSave}/>}
              label={t("Check to save columns")}
            />
            </Grid>
            <Grid container item xs={12} sm={6} justifyContent="flex-end">
              <Button onClick={handleClose} variant="outlined" color="secondary">
                {t("Cancel")}
              </Button>
              <Button onClick={applyColumn} variant="contained" color="primary">
                {t("Apply")}
              </Button>
            </Grid> 
          </Grid> 
        </DialogActions>
      </Dialog>
  );
}

ColumnDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose:PropTypes.func.isRequired,
  listName:PropTypes.string.isRequired,
  columns:PropTypes.array.isRequired,
  selectedColumns:PropTypes.array.isRequired,
  changeColumn:PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};