import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';

export const routesAnimation = trigger('routeAnimations', [
  transition('left => right', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('.3s ease-out', style({ transform: 'translateX(0%)' }))
        ],
        {
          optional: true
        }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('.3s ease-out', style({ transform: 'translateX(100%)' }))
        ],
        {
          optional: true
        }
      )
    ])
  ]),
  transition('right => left', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('.3s ease-out', style({ transform: 'translateX(0%)' }))
        ],
        {
          optional: true
        }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))
        ],
        {
          optional: true
        }
      )
    ])
  ]),
  transition('* => movement', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', 'background-color': 'white' }),
      {
        optional: true
      }
    ),
    group([
      query(
        ':enter',
        [
          style({
            transform: 'translateY(-100%)',
            'z-index': 1
          }),
          animate('.3s ease-out', style({ transform: 'translateY(0%)' }))
        ],
        {
          optional: true
        }
      )
    ])
  ]),
  transition('movement => *', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', 'background-color': 'white' }),
      {
        optional: true
      }
    ),
    group([
      query(
        ':leave',
        [
          style({
            transform: 'translateY(0%)',
            'z-index': 1
          }),
          animate('.3s ease-out', style({ transform: 'translateY(-100%)' }))
        ],
        {
          optional: true
        }
      )
    ])
  ])
]);
