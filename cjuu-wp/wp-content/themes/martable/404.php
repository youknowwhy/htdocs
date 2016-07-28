<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package martable
 */

get_header(); ?>

	<div id="primary" class="content-area-full">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found">
				<header class="page-header-not-found">
					<h1 class="page-title"><?php _e( 'Oops! That page can&rsquo;t be found.', 'martable' ); ?></h1>
				</header><!-- .page-header -->

				<div class="page-content">
					<p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'martable' ); ?></p>
				</div><!-- .page-content -->
			</section><!-- .error-404 -->
            
            <div class="fourohfour-widgets-container">	
            
                    <div class="widget-fourohfour">
                    	
                        <aside class="widget">
                    		<?php get_search_form(); ?>
                		</aside>
                        
                    	<?php if ( ! dynamic_sidebar( 'fourohfour-left' ) ) : ?>
                        	<?php the_widget( 'WP_Widget_Recent_Posts' ); ?>
                        <?php endif; // end sidebar widget area ?>
                        
                    </div>
                    
                    <div class="widget-fourohfour">
                    	
                        <?php if ( ! dynamic_sidebar( 'fourohfour-center' ) ) : ?>
							<?php if ( martable_categorized_blog() ) : // Only show the widget if site has multiple categories. ?>
                            <div class="widget widget_categories">
                                <h2 class="widget-title"><?php _e( 'Most Used Categories', 'martable' ); ?></h2>
                                <ul>
                                <?php
                                    wp_list_categories( array(
                                        'orderby'    => 'count',
                                        'order'      => 'DESC',
                                        'show_count' => 1,
                                        'title_li'   => '',
                                        'number'     => 10,
                                    ) );
                                ?>
                                </ul>
                            </div><!-- .widget -->
                            <?php endif; ?>
                                                  
                        <?php endif; // end sidebar widget area ?>
                        
                    </div>
                    
                    <div class="widget-fourohfour">
                    
                    	<?php if ( ! dynamic_sidebar( 'fourohfour-right' ) ) : ?>
							
							<?php
							/* translators: %1$s: smiley */
							$archive_content = '<p>' . sprintf( __( 'Try looking in the monthly archives. %1$s', 'martable' ), convert_smilies( ':)' ) ) . '</p>';
							the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$archive_content" );
							?> 
                            <?php the_widget( 'WP_Widget_Tag_Cloud' ); ?>                        
                        <?php endif; // end sidebar widget area ?>
                        
                    </div>

			</div><!-- .fourohfour-widgets-container -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
