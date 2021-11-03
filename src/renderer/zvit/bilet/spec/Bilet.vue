<template>
	<div>
		<div class="row" style="margin-top: 3px; font-size: 20px; text-align: right;">
			<div class="col" style="font-size: 15px;">
				<span class="pr-1"><strong >{{ t('dogovor-zaima') }}</strong></span>
				<span style="border: 2px solid;"><strong class="pl-1 pr-1"> № {{ bilet.number }}</strong></span>
			</div>
		</div>
		<div class="row">
			<div class="col border-top border-right" style="text-align: right;">
				<div class="row ">
					<div class="col-1 border-right">4</div>
					<div class="col" >{{ t('srok-zaima') }}</div>
				</div>
			</div>
			<div class="col border-bottom">
				{{ bilet.days }} дн.
			</div>
		</div>
		<div class="row">
			<div class="col border-top border-right" style="text-align: right;">
				<div class="row ">
					<div class="col-1 border-right">5</div>
					<div class="col" >{{ t('srok-vozvrata') }}</div>
				</div>
			</div>
			<div class="col border-bottom">
				{{ bilet.returnDate }}
			</div>
		</div>
		<div class="row">
			<div class="col border-top border-right" style="text-align: right;">
				<div class="row border-bottom">
					<div class="col-1 border-right">6</div>
					<div class="col" >{{ t('summa-na-ruki') }}</div>
				</div>
			</div>
			<div class="col border-bottom">
				{{ total }}
				<span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
			</div>
		</div>
			<div class="row border-bottom">
				<div class="col border-right" style="text-align: right;">
					<div class="row">
						<div class="col-1 border-right">7</div>
						<div class="col" >{{ t('procent-po-zaimu') }}</div>
					</div>
				</div>
				<div class="col">
					<div class="row">
						<div class="col p-0">
							{{ procent }}
							<span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
						</div>
						<div v-if="discount" class="col-4 p-0" style="font-size: 10px; font-style: italic;">
							<div class=" border-bottom">{{ value.fullProcent }}</div>
							<div class="">{{ `${discount}% ${t('discount')}` }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row border-bottom">
				<div class="col border-right" style="text-align: right;">
					<div class="row">
						<div class="col-1 border-right">8</div>
						<div class="col p-0 pr-1" style="line-height: 24px;">
							{{ t('podlejit-vozvratu') }}
						</div>
					</div>
				</div>
				<div class="col">
					{{ bilet.ocenca }}
					<span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
				</div>
			</div>
	</div>
</template>

<script>
import { toDouble, toNumber } from '@/functions'
export default {
	props: ['value'],
	inject: ['t'],
	computed: {
		bilet() {
			return this.value || {}
		},
		company() {
			return this.bilet.company || {}
		},
		procent() {
			const procent = this.bilet.procent
			return procent.summ || procent
		},
		discount() {
			return this.bilet.xDisc
		},
		total({ bilet, procent }) {
			const total = toNumber(bilet.ocenca) - toNumber(procent)
			return toDouble(total)
		}
	}

}
</script>

<style>

</style>