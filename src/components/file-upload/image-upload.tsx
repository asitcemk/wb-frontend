import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from 'axios';
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import { ApiUrls } from "../../api-urls";
import ProgressWithLabel from "../../helper/progress";

// Setting a high pixel ratio avoids blurriness in the canvas crop preview.
const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas:any, newWidth:any, newHeight:any) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}


function getCroppedImg(previewCanvas:any, crop:any) {
  if (!crop || !previewCanvas) {
    return;
  }  
  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
  return new File([canvas.toDataURL('image/jpeg')], Math.floor(Date.now() / 1000) + ".png", { type: "image/png" });
}


export const ImageUpload = forwardRef((props:any, ref) => {
  const { defaultAspect, uploadRes} = props;
  const imgRef = useRef<any>(null);
  const { t } = useTranslation();
  const [upImg, setUpImg] = useState();
  const [progress, setProgess] = useState(0);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", x: 20, y: 20, width: 50, height: 50 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(defaultAspect)

  useImperativeHandle(ref, () => ({
    onSelectFile(e: React.ChangeEvent<HTMLInputElement>){
      if (e.target.files && e.target.files.length > 0) {
        const reader: any = new FileReader();
        reader.addEventListener("load", () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
        setOpen(true);
      }
    }
  }));

  // const onLoad = useCallback((img:React.SyntheticEvent<HTMLImageElement>) => {
  //   imgRef.current = img;
  // }, []);

  function onLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate)
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  const upload = () => {
    setSubmitting(true);
    var file : any= getCroppedImg(previewCanvasRef.current, completedCrop);
    const data = new FormData();
    data.append('file', file);
    axios.post(ApiUrls.IMAGEUPLOAD, data, {
        headers: { contentType: "multipart/form-data", Authorization:"Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ0LCJzZWNyZXQiOiIyMGRlYTdjMTNmNzBmMGJjMTE1MjkzZmY4MDgxNWQzNTQ2MzkzYTk4IiwiaWF0IjoxNTk2NzI1NDA1fQ.iEBuJ8s_RmnN_3ElBdZUURn-5FvOoCPopOyFCiJCNi8"},
        onUploadProgress: (ProgressEvent:any) => {
          let progress:number = Math.round(
            ProgressEvent.loaded / ProgressEvent.total * 100);
          setProgess(progress);
        }, 
      })
      .then(res => { // then print response status
        uploadRes(res.data);
        setSubmitting(false);
        setProgess(0);
        setOpen(false);
      })
  };

  const handleClose = () => {
    setOpen(false);
    setProgess(0);
    setSubmitting(false);
  };

  return (
    <React.Fragment>
      {open?<Dialog 
        onClose={handleClose} 
        open={open}
        maxWidth='sm'
        fullWidth={true}
        scroll="body"
        >
        <DialogTitle>{t("Image Upload")}</DialogTitle>
        <DialogContent>
          {progress?<ProgressWithLabel value={Number(progress)} />:null}
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={aspect}
                style={{width:'100%'}}
              >
              <img src={upImg} onLoad={onLoad} ref={imgRef} />
              </ReactCrop>
            </Grid>
            <Grid item xs={4}>
            {!!completedCrop && (
              <canvas
                ref={previewCanvasRef}
                style={{width:'100%'}}
              />
            )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small" color="secondary" variant="outlined">
            {t("Cancel")}
          </Button>
          <Button
            type="button"
            disabled={!completedCrop?.width || !completedCrop?.height || submitting}
            onClick={upload}
            size="small" 
            color="primary"
            variant="contained"
            >
            {(submitting)?<CircularProgress size={25}/>:t("Upload")}
          </Button>
        </DialogActions>
      </Dialog>:null}  
    </React.Fragment>
  );
})

