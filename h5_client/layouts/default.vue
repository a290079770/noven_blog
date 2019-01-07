<template>
  <div class="flex flex-column flex-justify-between  layout">
		<div class="layout-header bg-full-img">
			<div class="text-ess-1 info layout-header-text font-lg">
				{{ pageTitle }}
			</div>
		</div>

    <div class="flex-1 font layout-cont">
    	<nuxt/>
    </div>

    <div class="layout-footer">
    	<div class="layout-footer-bg bg-full-img"></div>
    	<nv-footer/>
    </div>
  </div>
</template>

<script >
	import Footer from '@/components/Footer'
	export default {
		data() {
			return {
				pageTitle:'Noven Blog'
			}
		},
		components:{
			'nv-footer':Footer
		},

		watch: {
			$route(nv) {
				let pageTitle = sessionStorage.pageTitle;
				this.pageTitle = pageTitle || 'Noven Blog';
			}
		}
	}
</script>