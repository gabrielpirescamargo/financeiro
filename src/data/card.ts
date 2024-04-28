import amarelo from '../assets/cards/amarelo.png';
import azul from '../assets/cards/azul.png';
import branco from '../assets/cards/branco.png';
import cinza from '../assets/cards/cinza.png';
import rosa from '../assets/cards/rosa.png';
import roxo from '../assets/cards/roxo.png';
import verde from '../assets/cards/verde.png';
import inter from '../assets/cards/inter.png';
import magalu from '../assets/cards/magalu.png';
import renner from '../assets/cards/renner.png';
import nubank from '../assets/cards/nubank.png';
import vermelho from '../assets/cards/vermelho.png';

export function cardSkin(color) {
  if (color == '#4260FF') {
    return azul;
  }
  if (color == '#CD3737') {
    return vermelho;
  }
  if (color == '#FFE500') {
    return amarelo;
  }
  if (color == '#1C6B00') {
    return verde;
  }
  if (color == '#646464') {
    return cinza;
  }
  if (color == '#FFFFFF') {
    return branco;
  }
  if (color == '#CC3891') {
    return rosa;
  }
  if (color == '#AC42FF') {
    return roxo;
  }
  if (color == '#FFA350') {
    return inter;
  }
  if (color == '#A031FF') {
    return nubank;
  }
  if (color == '#FF4343') {
    return renner;
  }
  if (color == '#8AC5FF') {
    return magalu;
  }
}
