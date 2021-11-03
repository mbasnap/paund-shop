<template>
  <div >
		<div style="font-weight: bold;">
			<div class="col border-bottom">
				<div class="row">{{ fio }}</div>
			</div>
		</div>
		<div class="col p-0">
			<div v-for="(item, index) in obespechenie" :key="index">
				<div class="row p-0" style="font-size: 10px; line-height: 25px;">
					<div class="col-7 pr-0" style="overflow: hidden; width: 50px; text-overflow: ellipsis; white-space: nowrap;">
						<strong>{{ item.title}}</strong>
					</div>
					<div class="col p-0"  style="font-size: 8px; display: flex; text-align: right;">
						<span class="pr-2">{{ item.proba}}</span>
						<span class="pr-2">{{ item.ves}}</span>
						<span >{{ item.total}}</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	props: ['value'],
	inject: ['t'],
	computed: {
		bilet({ value }) {
			return {...value}
		},
		klient({ bilet }) {
			return { ...bilet.klient }
		},
		fio({ klient }) {
			const { family = '', name = '', sername = '' } = klient
			return `${family} ${name.charAt(0)}.${sername.charAt(0)}.`
		},
		obespechenie({ bilet }) {
			return bilet.obespechenie || []
		}
	}
}
</script>

<style>

</style>