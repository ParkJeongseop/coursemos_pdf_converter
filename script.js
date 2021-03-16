var script1 = document.createElement('script');
script1.type = 'text/javascript';
script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js';
document.head.appendChild(script1);

var script2 = document.createElement('script');
script2.type = 'text/javascript';
script2.text = `async function get_pdf() {
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
                        doc.addImage(pic[j - 1], 'JPEG', 0, 0, 960, 720);
                        if (j == n) {
                            doc.save(document.querySelector("#headLogo > div").textContent);
                        } else {
                            doc.addPage();
                        }
                    }
                    console.log("PDF변환이 끝났습니다.");
                }
            }
        }
    }
}`;
document.head.appendChild(script2);

var a = document.createElement('a');
a.style = 'float: left; margin-right: 10px; margin-top: 5px; display: block; text-decoration: none; background-color: rgb(177, 177, 177); color: rgb(66, 66, 66); padding: 8px;';
a.text = '강제PDF다운로드'
a.href = `javascript:get_pdf();`;
document.querySelector("#headRight > div.gnb").appendChild(a);