<template>
	<div class="row justify-center items-center h-2">
		<div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
			<div class="row">
				<div class="col-sm-12 error-code">4<span>0</span>4</div>
				<div class="col-12 q-my-lg error-desc">¡Ah, oh! La página que estás intentando acceder no existe.</div>
				<div class="col-xs-12 col-sm-6">
					<router-link to="/">
						<q-btn type="button" size="large">Volver a la página de inicio</q-btn>
					</router-link>
				</div>
				<div class="col-xs-12 col-sm-6">
					<q-btn class="error-btn" type="button" size="large" @click="goBack">Volver a la página anterior</q-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
	router.go(-1);
};
</script>

<style scoped>
.error-page {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
	/* background: #f3f3f3; */
	box-sizing: border-box;
}

.error-code {
	line-height: 1;
	font-size: 250px;
	font-weight: bolder;
	color: #2d8cf0;
}

.error-code span {
	color: #00a854;
}

.error-desc {
	font-size: 30px;
	color: #777;
}

/* .error-handle {
	margin-top: 30px;
	padding-bottom: 200px;
} */

/* .error-btn {
	margin-left: 100px;
} */
</style>
