import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';

const open_close_timer = 3;

export const FMopenClose = trigger('FMopenClose', [
  state(
    'open',
    style({
      opacity: 1.0,
    })
  ),
  state(
    'closed',
    style({
      opacity: 0.0,
    })
  ),
  transition('* => *', [animate('7s ease')]),
]);

export const openClose = trigger('openClose', [
  // ...
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      opacity: 0.0,

      transform: 'translateX(-200%)',
    })
  ),
  transition('* => *', [animate(open_close_timer + 's ease-in')]),
]);

export const rightOpenClose = trigger('rightOpenClose', [
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      opacity: 0.0,

      transform: 'translateX(200%)',
    })
  ),
  transition('* => *', [animate(open_close_timer + 's ease-in')]),
]);

export const teardropChangeColor = trigger('teardropChangeColor', [
  // ...
  state(
    'open',
    style({
      fill: 'black',
      stroke: 'black',
    })
  ),
  state(
    'closed',
    style({
      fill: 'white',
      stroke: 'white',
      zIndex: -1,
    })
  ),
  transition('open => closed', [animate('10ms ease-in')]),
  transition('closed => open', [animate('10ms ease-in')]),
]);
