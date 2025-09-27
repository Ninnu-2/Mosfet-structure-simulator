
const voltageSlider = document.getElementById('gateVoltage');
const voltageValue = document.getElementById('voltageValue');
const channel = document.querySelector('.channel');
const channel_new = document.querySelector('.channel_new');

const VT = 1.0; // Threshold voltage

voltageSlider.addEventListener('input', () => {
  const VG = parseFloat(voltageSlider.value);
  voltageValue.textContent = VG.toFixed(1) + "V";

  const maxHeight = 30; // max channel height
  const minHeight = 0;

  // Channel grows only if VG > VT
  const effectiveVG = Math.max(0, VG - VT);
  const range = 10 - VT; // Remaining range above VT

  const height = effectiveVG > 0
    ? minHeight + (effectiveVG / range) * maxHeight
    : 0;

  channel.style.height = `${height}px`;
  channel_new.style.height = `${height}px`;
  channel_new.dataset.heigh = height;
const vd=parseFloat(channel.dataset.vds||"0");
if (vd > VG && VG >= VT) {
  statusMessage.textContent = "Pinch off!!";
} else {
  statusMessage.textContent = "";
}

});

const dsSlider = document.getElementById('dsVoltage');
const dsValue = document.getElementById('dsvValue');

dsSlider.addEventListener('input', () => {
  const VDS = parseFloat(dsSlider.value);
  channel.dataset.vds=VDS;
  dsValue.textContent = VDS.toFixed(1) + "V";
  const heig = parseFloat(channel_new.dataset.heigh||"0");
  const VG = parseFloat(voltageSlider.value);
//const maxAngle = (VDS<=VG)? Math.atan(heig/200): Math.atan(heig,200); // degrees
const maxAngle = Math.atan(heig/200);
const effectiveVds = Math.min(VDS, VG); // cap at VG
  const angleRad = (VDS / VG) * maxAngle;
  const angle = angleRad*(180/Math.PI);
const statusMessage = document.getElementById('statusMessage');

// ... inside your dsSlider event listener:
if (VDS > VG && VG > VT) {
  statusMessage.textContent = "Pinch off!!";
} else {
  statusMessage.textContent = "";
}

  // Tilt left (rotate counter-clockwise)
  channel_new.style.transform = `rotate(${-angle}deg)`;
  channel_new.style.transformOrigin = 'bottom left';
});
