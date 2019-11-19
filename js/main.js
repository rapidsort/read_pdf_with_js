// Access-Control-Allow-Origin: *



const url = 'https://d.dam.sap.com/m/BaZ1atJ/MKT_CLD_ServicePortfolio_InfoSheet_EN_1308.pdf';
// const url = 'https://assets.cdn.sap.com/sapcom/docs/gated/2018/12/8a3bee27-2e7d-0010-87a3-c30de2ffd8ff.pdf';
// const url = '../Gold Guide_ Make Every Moment Matter.pdf';

let pdfDoc = null;
let pagesToRender=2;
const scale = 1.5,
canvasContainer = document.querySelector('#pdf-render'),
  canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');

  

  function renderPage(page) {

    
    if(page.pageIndex == 0){
      canvasContainer.innerHTML = '';
    }
    
    var viewport = page.getViewport(scale);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    canvasContainer.appendChild(canvas);
    
    page.render(renderContext);
    if(page.pageIndex == pagesToRender-1){
      moreInfoSlide();
    }
}


function moreInfoSlide(){
  var lastCanvas = document.createElement("canvas");
  lastCanvas.id = "mycanvas";
  lastCanvas.height = 550;
  lastCanvas.width = canvasContainer.offsetWidth;

  var lastCanvasCTX = lastCanvas.getContext("2d");
  // lastCanvasCTX.font = "30px Comic Sans MS";
  lastCanvasCTX.font = "30px Arial";
  lastCanvasCTX.fillStyle = "black";
  lastCanvasCTX.textAlign = "center";
  lastCanvasCTX.fillText("Fill the above form", lastCanvas.width/2, lastCanvas.height/2);
  canvasContainer.appendChild(lastCanvas);

  lastCanvasCTX.font = "20px Arial";
  lastCanvasCTX.fillStyle = "black";
  lastCanvasCTX.textAlign = "center";
  lastCanvasCTX.fillText("to get full version of document", lastCanvas.width/2, (lastCanvas.height/2)+30);
  canvasContainer.appendChild(lastCanvas);

}




function displayPDF(url){
  // Get Document
pdfjsLib
.getDocument(url)
.promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  const showpagesCount = document.querySelector('#pagesCount');
  showpagesCount.innerHTML = pdfDoc.numPages;
  for(var num = 1; num <= pagesToRender; num++){
        pdfDoc.getPage(num).then(renderPage);
  }
  // 
})
.catch(err => {
  // Display error
  const div = document.createElement('div');
  div.className = 'error';
  div.appendChild(document.createTextNode(err.message));
  document.querySelector('body').insertBefore(div, canvas);
});

}

displayPDF(url);