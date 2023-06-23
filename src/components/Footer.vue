<template>
    <q-footer elevated>
        <q-toolbar class="bgColorEnfasis">
            <q-space />

            <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
                <q-icon name="grass" color="white" size="28px" />
                <q-toolbar-title shrink class="text-weight-bold">
                    Proyecto Panelero MEAW ⚪
                </q-toolbar-title>
            </q-btn>

            <q-space />
        </q-toolbar>
    </q-footer>
</template>