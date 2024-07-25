import Block from "./block.js";
export default class QuickListMultiple extends Block {
	static get toolbox() {
		return {
			title: "Quick List Multiple",
			icon: frappe.utils.icon("list", "sm"),
		};
	}

	static get isReadOnlySupported() {
		return true;
	}

	constructor({ data, api, config, readOnly, block }) {
		super({ data, api, config, readOnly, block });
		this.col = this.data.col ? this.data.col : "4";
		this.allow_customization = !this.readOnly;
		this.options = {
			allow_sorting: this.allow_customization,
			allow_create: this.allow_customization,
			allow_delete: this.allow_customization,
			allow_hiding: false,
			allow_edit: true,
			allow_resize: true,
			min_width: 4,
			max_widget_count: 2,
		};
	}

	render() {
		this.wrapper = document.createElement("div");
		this.new("quick_list_multiple");

		if (this.data && this.data.quick_list_multiple_name) {
			let has_data = this.make("quick_list_multiple", this.data.quick_list_multiple_name);
			if (!has_data) return;
		}

		if (!this.readOnly) {
			$(this.wrapper).find(".widget").addClass("quick_list_multiple edit-mode");
			this.add_settings_button();
			this.add_new_block_button();
		}

		return this.wrapper;
	}

	validate(savedData) {
		if (!savedData.quick_list_multiple_name) {
			return false;
		}

		return true;
	}

	save() {
		return {
			quick_list_multiple_name: this.wrapper.getAttribute("quick_list_multiple_name"),
			col: this.get_col(),
			new: this.new_block_widget,
		};
	}
}
