this.console.log("ON");
var script1 = this.document.createElement('script');
script1.type = 'text/javascript';
script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js';
this.document.head.appendChild(script1);

var script2 = this.document.createElement('script');
script2.type = 'text/javascript';
script2.text = `function get_pdf() {
    let btn = this.document.getElementById('btn_get_pdf');
    btn.href = "";
    btn.textContent = "` + chrome.i18n.getMessage('Converting_to_PDF') + `";
    console.log("PDF변환 시작하였습니다.");
    let n = Number(document.querySelector("#totalPageNumber").textContent);
    let prefix = document.querySelector("#page0").src.split('1.png')[0];
    let a = new Image();
    a.src = document.querySelector("#page0").src;
    a.onload = function () {
        var doc = new jspdf.jsPDF("l", "mm", [a.width, a.height]);
        let pic = [];
        let count = 0;
        for (let i = 1; i <= n; i++) {
            pic.push(new Image());
            let b = prefix + i + '.png';
            pic[i - 1].src = b;
            pic[i - 1].onload = function () {
                console.log("이미지 다운로드중" + (count+1) + "/" + n);
                count += 1;
                if (count == n) {
                    for (let j = 1; j <= n; j++) {
                        console.log("PDF변환중" + (j) + "/" + n);
                        doc.addImage(pic[j - 1], 'JPEG', 0, 0, a.width, a.height);
                        if (j == n) {
                            doc.save(document.querySelector("#headLogo > div").textContent);
                        } else {
                            doc.addPage();
                        }
                    }
                    console.log("PDF변환이 끝났습니다.");
                    btn.href = 'javascript:get_pdf();';
                    btn.textContent = "` + chrome.i18n.getMessage('Convert_to_PDF') + `";
                }
            }
        }
    }
}`;
this.document.head.appendChild(script2);

var a = this.document.createElement('a');
a.id = 'btn_get_pdf';
a.style = 'float: left; margin-left: 10px; margin-right: 10px; margin-top: 5px; display: block; text-decoration: none; background-color: rgb(177, 177, 177); color: rgb(66, 66, 66); padding: 8px;';
a.text = chrome.i18n.getMessage('Convert_to_PDF');
a.href = `javascript:get_pdf();`;
setTimeout(`
if(document.querySelector("#headRight > div.gnb > div") === null) {
    this.document.querySelector('#headRight > div.gnb').appendChild(a)
}else{
    document.querySelector("#headRight > div.gnb > div").insertBefore(a, document.querySelector("#headRight > div.gnb > div > div"));
}`, 1000);
