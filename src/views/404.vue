<!-- <template>
    <div>
        <h1>Error 404</h1>
    </div>
</template> -->

<template>
	<div class="error-page">
		<div class="error-code">4<span>0</span>4</div>
		<div class="error-desc">¡Ah, oh! La página que estás intentando acceder no existe.</div>
		<div class="error-handle">
			<router-link to="/">
				<el-button type="primary" size="large">Volver a la página de inicio</el-button>
			</router-link>
			<el-button class="error-btn" type="primary" size="large" @click="goBack">Volver a la página anterior</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="404">
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
	background: #f3f3f3;
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
.error-handle {
	margin-top: 30px;
	padding-bottom: 200px;
}
.error-btn {
	margin-left: 100px;
}
</style>
