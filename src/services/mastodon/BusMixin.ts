import { Component } from 'vue-property-decorator'

import LocalBusMixin from '@/components/LocalBusMixin'
import { BusOptions } from './Types'

@Component
export default class BusMixin extends LocalBusMixin<BusOptions, any> { }

export const LocalEvents = {
  Mark: 'mark',
  Vote: 'vote',
  Context: 'context'
}