const form = document.querySelector('form');
//Inputs
const radius = document.querySelector('#radius-input');
const angle = document.querySelector('#angle-input');
const PI = document.querySelector('#station-input');
//Inputs Values Print
const radiusOutput = document.querySelector('#radius-output');
const angleOutput = document.querySelector('#angle-output');
const piOutput = document.querySelector('#pi-output');
//table body
const tableBody = document.querySelector('#table-body');
//results using formulae
const PCstation = document.querySelector('#PC-station');
const PTstation = document.querySelector('#PT-station');
//
const submit = document.querySelector('#submit');
let n = 1;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    radiusOutput.innerHTML = "<b>Radius Of Curve(R):</b>" + " " + radius.value;
    angleOutput.innerHTML = "<b>Deflection Angle(Δ):</b>" + " " + angle.value;
    piOutput.innerHTML = "<b>PI Station:</b>" + " " + PI.value;

    if (radius.value < 0) {
        alert('Radius of Curve can not be negative');
        radius.style.border = "1px solid red"; 
        
        radiusOutput.innerHTML = "<b>Radius Of Curve(R):</b>" 
        angleOutput.innerHTML = "<b>Deflection Angle(Δ):</b>" 
        piOutput.innerHTML = "<b>PI Station:</b>" ;

    } else if (angle.value == 0 || angle.value == 180) {
        alert('Deflection Angle can not be 0 or 180');
        angle.style.border = "1px solid red"; 

        radiusOutput.innerHTML = "<b>Radius Of Curve(R):</b>" 
        angleOutput.innerHTML = "<b>Deflection Angle(Δ):</b>" 
        piOutput.innerHTML = "<b>PI Station:</b>" ;
    } else {

        let PCstationValue = (parseInt(PI.value - radius.value * Math.tan((angle.value * Math.PI / 180) / 2)));
        PCstation.innerHTML = "<b>PC Station:</b>" + " " + PCstationValue;

        let PTStationValue = parseInt(PCstationValue + 2 * Math.PI * radius.value * angle.value / 360);
        PTstation.innerHTML = "<b>PT Station:</b>" + " " + PTStationValue;

        const tr = document.createElement('tr');
        tableBody.appendChild(tr);

        const th = document.createElement('th');
        th.textContent = n;
        tr.appendChild(th);

        const tdOne = document.createElement('td');
        tdOne.textContent = parseInt(PCstationValue);
        tr.appendChild(tdOne);

        n++;
        //Just for column Y
        let radiusValue = radius.value;
        // console.log(radiusValue);
        //Just for column Y
        for (let i = PCstationValue; i < PTStationValue; i++) {
            if (i % 20 == 0) {
                const tr = document.createElement('tr');
                tableBody.appendChild(tr);

                const th = document.createElement('th');
                th.textContent = n;
                tr.appendChild(th);

                const tdOne = document.createElement('td');
                tdOne.textContent = parseInt(i);
                tr.appendChild(tdOne);

                n++;
            }
        }

        const anothertr = document.createElement('tr');
        tableBody.appendChild(anothertr);

        const anotherth = document.createElement('th');
        anotherth.textContent = n;
        anothertr.appendChild(anotherth);

        const lasttdOne = document.createElement('td');
        lasttdOne.textContent = parseInt(PTStationValue);
        anothertr.appendChild(lasttdOne);

        form.reset();

        const alltds = document.querySelectorAll('td');
        const alltrs = document.querySelectorAll('tr');
        for (let j = 0; j <= alltrs.length; j++) {

            const tdTwo = document.createElement('td');
            alltrs[j + 2].appendChild(tdTwo);
            tdTwo.textContent = (alltds[j + 1].textContent - alltds[j].textContent);


            const tdThree = document.createElement('td');
            tdThree.classList.add('tdThree');
            alltrs[j + 2].appendChild(tdThree);
            let x = parseInt(tdTwo.textContent);
            tdThree.textContent = parseFloat((180 * x) / (2 * Math.PI * parseInt(radiusValue))).toFixed(2);

            const alltdThree = document.querySelectorAll('.tdThree');
            if (alltdThree.length == (alltrs.length - 2)) {

                const sum = document.querySelector('#sum');
                sum.innerHTML = "<b>Summation of θi:</b>" + " " + (parseInt(alltrs.length - 4) * parseFloat(alltdThree[1].textContent) + parseFloat(alltdThree[0].textContent) + parseFloat(alltdThree[alltrs.length - 3].textContent)).toFixed(0);
            }
        }
    }


}); 
