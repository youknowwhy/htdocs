<?php
	global $wp_query, $wpsc_variations, $wpsc_custom_meta;
	$wpsc_custom_meta = new wpsc_custom_meta( get_the_ID() );
	$wpsc_variations = new wpsc_variations( get_the_ID() );
?>
<div class="default_product_display product_view_<?php echo wpsc_the_product_id(); ?>">
	<?php
		// Breadcrumbs
		wpsc_output_breadcrumbs();

		// Plugin hook for adding things to the top of the products page, like the live search
		do_action( 'wpsc_top_of_products_page' );
	?>

	<h2 class="prodtitle entry-title">
		<?php if(get_option('hide_name_link') == 1) : ?>
			<?php echo wpsc_the_product_title(); ?>
		<?php else: ?>
			<a class="wpsc_product_title" href="<?php echo wpsc_the_product_permalink(); ?>"><?php echo wpsc_the_product_title(); ?></a>
		<?php endif; ?>
	</h2>

	<div class="productcol">
		<?php do_action('wpsc_product_before_description', wpsc_the_product_id(), $wp_query->post); ?>

		<div class="wpsc_description">
			<?php echo wpsc_the_product_description(); ?>
		</div><!--close wpsc_description-->

		<?php do_action( 'wpsc_product_addons', wpsc_the_product_id() ); ?>

		<?php if(wpsc_the_product_additional_description()) : ?>
			<div class="additional_description_container">
				<img class="additional_description_button"  src="<?php echo WPSC_CORE_THEME_URL; ?>wpsc-images/icon_window_expand.gif" alt="Additional Description" />
				<a href="<?php echo wpsc_the_product_permalink(); ?>" class="additional_description_link"><?php _e('More Details', 'wpsc'); ?></a>
				<div class="additional_description">
					<p><?php echo wpsc_the_product_additional_description(); ?></p>
				</div><!--close additional_description-->
			</div><!--close additional_description_container-->
		<?php endif; ?>

		<?php do_action( 'wpsc_product_addon_after_descr', wpsc_the_product_id() ); ?>

		<?php if(wpsc_product_external_link(wpsc_the_product_id()) != '') : ?>
			<?php $action =  wpsc_product_external_link(wpsc_the_product_id()); ?>
		<?php else: ?>
			<?php $action = htmlentities(wpsc_this_page_url(), ENT_QUOTES, 'UTF-8' ); ?>
		<?php endif; ?>

		<?php
			/**
			 * Custom meta HTML and loop
			 */
			?>
			<?php if (wpsc_have_custom_meta()) : ?>
			<div class="custom_meta">
				<?php while ( wpsc_have_custom_meta() ) : wpsc_the_custom_meta(); ?>
					<?php if (stripos(wpsc_custom_meta_name(),'g:') !== FALSE) continue; ?>
					<strong><?php echo wpsc_custom_meta_name(); ?>: </strong><?php echo wpsc_custom_meta_value(); ?><br />
				<?php endwhile; ?>
			</div><!--close custom_meta-->
			<?php endif; ?>
			<?php
			/**
			 * Form data
			 */
		?>

		<form class="product_form" enctype="multipart/form-data" action="<?php echo $action; ?>" method="post" name="product_<?php echo wpsc_the_product_id(); ?>" id="product_<?php echo wpsc_the_product_id(); ?>" >
			<?php do_action ( 'wpsc_product_form_fields_begin' ); ?>
			<?php if ( wpsc_product_has_personal_text() ) : ?>
				<fieldset class="custom_text">
					<legend><?php _e( 'Personalize Your Product', 'wpsc' ); ?></legend>
					<p><?php _e( 'Complete this form to include a personalized message with your purchase.', 'wpsc' ); ?></p>
					<textarea cols='55' rows='5' name="custom_text"></textarea>
				</fieldset>
			<?php endif; ?>

			<?php if ( wpsc_product_has_supplied_file() ) : ?>

				<fieldset class="custom_file">
					<legend><?php _e( 'Upload a File', 'wpsc' ); ?></legend>
					<p><?php _e( 'Select a file from your computer to include with this purchase.', 'wpsc' ); ?></p>
					<input type="file" name="custom_file" />
				</fieldset>
			<?php endif; ?>
			<?php /** the variation group HTML and loop */?>
			<?php if (wpsc_have_variation_groups()) { ?>
				<fieldset>
					<legend><?php _e('Product Options', 'wpsc'); ?></legend>
					<div class="wpsc_variation_forms">
						<table>
							<?php while (wpsc_have_variation_groups()) : wpsc_the_variation_group(); ?>
								<tr><td class="col1"><label for="<?php echo wpsc_vargrp_form_id(); ?>"><?php echo wpsc_the_vargrp_name(); ?>:</label></td>
								<?php /** the variation HTML and loop */?>
								<td class="col2"><select class="wpsc_select_variation" name="variation[<?php echo wpsc_vargrp_id(); ?>]" id="<?php echo wpsc_vargrp_form_id(); ?>">
								<?php while (wpsc_have_variations()) : wpsc_the_variation(); ?>
									<option value="<?php echo wpsc_the_variation_id(); ?>" <?php echo wpsc_the_variation_out_of_stock(); ?>><?php echo wpsc_the_variation_name(); ?></option>
								<?php endwhile; ?>
								</select></td></tr>
							<?php endwhile; ?>
						</table>
					</div><!--close wpsc_variation_forms-->
				</fieldset>
			<?php } ?>
			<?php /** the variation group HTML and loop ends here */?>

			<!-- THIS IS THE QUANTITY OPTION MUST BE ENABLED FROM ADMIN SETTINGS -->
			<?php if(wpsc_has_multi_adding()): ?>
				<fieldset><legend><?php _e('Quantity', 'wpsc'); ?></legend>
					<div class="wpsc_quantity_update">
					<?php /*<label for="wpsc_quantity_update_<?php echo wpsc_the_product_id(); ?>"><?php _e('Quantity', 'wpsc'); ?>:</label>*/ ?>
					<input type="text" id="wpsc_quantity_update_<?php echo wpsc_the_product_id(); ?>" name="wpsc_quantity_update" size="2" value="1" />
					<input type="hidden" name="key" value="<?php echo wpsc_the_cart_item_key(); ?>"/>
					<input type="hidden" name="wpsc_update_quantity" value="true" />
					</div><!--close wpsc_quantity_update-->
				</fieldset>
			<?php endif ;?>

			<div class="wpsc_product_price">
				<?php if( wpsc_show_stock_availability() ): ?>
					<?php if(wpsc_product_has_stock()) : ?>
						<div id="stock_display_<?php echo wpsc_the_product_id(); ?>" class="in_stock"><?php _e('Product in stock', 'wpsc'); ?></div>
					<?php else: ?>
						<div id="stock_display_<?php echo wpsc_the_product_id(); ?>" class="out_of_stock"><?php _e('Product not in stock', 'wpsc'); ?></div>
					<?php endif; ?>
				<?php endif; ?>

				<?php if(wpsc_product_is_donation()) : ?>
					<label for="donation_price_<?php echo wpsc_the_product_id(); ?>"><?php _e('Donation', 'wpsc'); ?>: </label>
					<input type="text" id="donation_price_<?php echo wpsc_the_product_id(); ?>" name="donation_price" value="<?php echo wpsc_calculate_price(wpsc_the_product_id()); ?>" size="6" />
				<?php else : ?>
					<?php if(wpsc_product_on_special()) : ?>
						<p class="pricedisplay product_<?php echo wpsc_the_product_id(); ?>"><?php _e('Old Price', 'wpsc'); ?>: <span class="oldprice" id="old_product_price_<?php echo wpsc_the_product_id(); ?>"><?php echo wpsc_product_normal_price(); ?></span></p>
					<?php endif; ?>

					<p class="pricedisplay product_<?php echo wpsc_the_product_id(); ?>"><?php _e('Price', 'wpsc'); ?>: <span id='product_price_<?php echo wpsc_the_product_id(); ?>' class="currentprice pricedisplay"><?php echo wpsc_the_product_price(); ?></span></p>

					<?php if(wpsc_product_on_special()) : ?>
						<p class="pricedisplay product_<?php echo wpsc_the_product_id(); ?>"><?php _e('You save', 'wpsc'); ?>: <span class="yousave" id="yousave_<?php echo wpsc_the_product_id(); ?>"><?php echo wpsc_currency_display(wpsc_you_save('type=amount'), array('html' => false)); ?>! (<?php echo wpsc_you_save(); ?>%)</span></p>
					<?php endif; ?>

					<!-- multi currency code -->
					<?php if(wpsc_product_has_multicurrency()) : ?>
						<?php echo wpsc_display_product_multicurrency(); ?>
					<?php endif; ?>

					<?php if(wpsc_show_pnp()) : ?>
						<p class="pricedisplay"><?php _e('Shipping', 'wpsc'); ?>:<span class="pp_price"><?php echo wpsc_product_postage_and_packaging(); ?></span></p>
					<?php endif; ?>
				<?php endif; ?>
			</div><!--close wpsc_product_price-->

			<input type="hidden" value="add_to_cart" name="wpsc_ajax_action"/>
			<input type="hidden" value="<?php echo wpsc_the_product_id(); ?>" name="product_id"/>

			<!-- END OF QUANTITY OPTION -->
			<?php if((get_option('hide_addtocart_button') == 0) &&  (get_option('addtocart_or_buynow') !='1')) : ?>
				<?php if(wpsc_product_has_stock()) : ?>
					<div class="wpsc_buy_button_container">
						<div class="wpsc_loading_animation">
							<img title="Loading" alt="Loading" src="<?php echo wpsc_loading_animation_url(); ?>" />
							<?php _e('Updating cart...', 'wpsc'); ?>
						</div><!--close wpsc_loading_animation-->

						<?php if(wpsc_product_external_link(wpsc_the_product_id()) != '') : ?>
							<?php $action = wpsc_product_external_link( wpsc_the_product_id() ); ?>
							<input class="wpsc_buy_button" type="submit" value="<?php echo wpsc_product_external_link_text( wpsc_the_product_id(), __( 'Buy Now', 'wpsc' ) ); ?>" onclick="return gotoexternallink('<?php echo $action; ?>', '<?php echo wpsc_product_external_link_target( wpsc_the_product_id() ); ?>')">
						<?php else: ?>
							<input type="submit" value="<?php _e('Add To Cart', 'wpsc'); ?>" name="Buy" class="wpsc_buy_button" id="product_<?php echo wpsc_the_product_id(); ?>_submit_button"/>
						<?php endif; ?>
					</div><!--close wpsc_buy_button_container-->
				<?php endif ; ?>
			<?php endif ; ?>
			<div class="entry-utility wpsc_product_utility">
				<?php edit_post_link( __( 'Edit', 'wpsc' ), '<span class="edit-link">', '</span>' ); ?>
			</div>
		</form><!--close product_form-->

		<?php if((get_option('hide_addtocart_button') == 0) && (get_option('addtocart_or_buynow')=='1')) : ?>
			<?php echo wpsc_buy_now_button(wpsc_the_product_id()); ?>
		<?php endif ; ?>

		<?php echo wpsc_product_rater(); ?>
		<?php // */ ?>
	</div><!--close productcol-->
	<?php if(wpsc_product_on_special()) : ?><span class="sale"><?php _e('Sale', 'wpsc'); ?></span><?php endif; ?>
</div><!--close default_product_display-->