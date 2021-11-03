<template>
	<div>
		<div class="row pl-4" style="height: 200px;">
			<klient class="col " :value="value"/>
			<bilet class="col border-left" :value="value"/>
		</div>
		<div class="row" style="height: 45px; ">
			<div class="col">
				<div class="row">
					<div class="col pr-0" style="font-style: italic; line-height: 14px; font-size: 11px; text-align: right;">
							{{ t('text-aggree')}}
					</div>
					<sign class="col-4" :name="t('klient_sign')" style="margin-top: 25px;"/>
				</div>
			</div>
			<div class="col">
				<div class="row mt-2" >
					<div class="col" style="font-style: italic; line-height: 14px; font-size: 11px; text-align: right;">
						{{ t('poluchil')}}
					</div>
					<sign class="col-4" :name="t('klient_sign')" style="margin-top: 7px;"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Klient from './Klient'
import Bilet from './Bilet'
import Sign from '../Sign'
import Dater from './Dater'

export default {
	components: { Klient, Bilet, Sign, Dater },
	inject: ['t'],
	props: ['value', 'klient']
}
</script>

<style>

</style>